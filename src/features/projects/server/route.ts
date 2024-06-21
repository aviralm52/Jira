import { Hono } from "hono";
import { ID, Query } from "node-appwrite";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

import { getMember } from "@/features/members/utils";
import { sessionMiddleware } from "@/lib/session-middleware";
import { MemberRole } from "@/features/members/types";
import {
    DATABASE_ID,
    IMAGES_BUCKET_ID,
    PROJECTS_ID,
    TASKS_ID,
    WORKSPACES_ID,
} from "@/config";

import { createProjectSchema, updateProjectSchema } from "../schema";
import { Project } from "../types";
import { endOfMonth, startOfMonth, subMonths } from "date-fns";
import { TaskStatus } from "@/features/tasks/types";

const app = new Hono()
    .get(
        "/",
        sessionMiddleware,
        zValidator("query", z.object({ workspaceId: z.string() })),
        async (c) => {
            const user = c.get("user");
            const databases = c.get("databases");

            const { workspaceId } = c.req.valid("query");

            if (!workspaceId) {
                return c.json({ error: "Missing workspaceId" }, 400);
            }

            const member = await getMember({
                databases,
                workspaceId,
                userId: user.$id,
            });

            if (!member) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            const projects = await databases.listDocuments<Project>(
                DATABASE_ID,
                PROJECTS_ID,
                [
                    Query.equal("workspaceId", workspaceId),
                    Query.orderDesc("$createdAt"),
                ]
            );

            return c.json({ data: projects });
        }
    )
    .get("/:projectId", sessionMiddleware, async (c) => {
        const user = c.get("user");
        const databases = c.get("databases");
        const { projectId } = c.req.param();

        const project = await databases.getDocument<Project>(
            DATABASE_ID,
            PROJECTS_ID,
            projectId
        );

        const member = await getMember({
            databases,
            workspaceId: project.workspaceId,
            userId: user.$id,
        });

        if (!member) {
            return c.json({ error: "Unauthorized" }, 401);
        }

        return c.json({ data: project });
    })
    .get("/:projectId/analytics", sessionMiddleware, async (c) => {
        const user = c.get("user");
        const databases = c.get("databases");
        const { projectId } = c.req.param();

        const project = await databases.getDocument<Project>(
            DATABASE_ID,
            PROJECTS_ID,
            projectId
        );

        const member = await getMember({
            databases,
            workspaceId: project.workspaceId,
            userId: user.$id,
        });

        if (!member) {
            return c.json({ error: "Unauthorized" }, 401);
        }

        const now = new Date();
        const thisMonthStart = startOfMonth(now);
        const thisMonthEnd = endOfMonth(now);
        const lastMonthStart = startOfMonth(subMonths(now, 1));
        const lastMonthEnd = endOfMonth(subMonths(now, 1));

        //! Task Count Difference
        const thisMonthTasks = await databases.listDocuments(
            DATABASE_ID,
            TASKS_ID,
            [
                Query.equal("projectId", project.$id),
                Query.greaterThanEqual(
                    "$createdAt",
                    thisMonthStart.toISOString()
                ),
                Query.lessThanEqual("$createdAt", thisMonthEnd.toISOString()),
            ]
        );

        const lastMonthTasks = await databases.listDocuments(
            DATABASE_ID,
            TASKS_ID,
            [
                Query.equal("projectId", project.$id),
                Query.greaterThanEqual(
                    "$createdAt",
                    lastMonthStart.toISOString()
                ),
                Query.lessThanEqual("$createdAt", lastMonthEnd.toISOString()),
            ]
        );

        const taskCount = thisMonthTasks.total;
        const taskDifference = taskCount - lastMonthTasks.total;

        //! Assigned Task Count Difference
        const thisMonthAssignedTasks = await databases.listDocuments(
            DATABASE_ID,
            TASKS_ID,
            [
                Query.equal("projectId", project.$id),
                Query.equal("assigneeId", member.$id),
                Query.greaterThanEqual(
                    "$createdAt",
                    thisMonthStart.toISOString()
                ),
                Query.lessThanEqual("$createdAt", thisMonthEnd.toISOString()),
            ]
        );

        const lastMonthAssignedTasks = await databases.listDocuments(
            DATABASE_ID,
            TASKS_ID,
            [
                Query.equal("projectId", project.$id),
                Query.equal("assigneeId", member.$id),
                Query.greaterThanEqual(
                    "$createdAt",
                    lastMonthStart.toISOString()
                ),
                Query.lessThanEqual("$createdAt", lastMonthEnd.toISOString()),
            ]
        );

        const assignedTaskCount = thisMonthAssignedTasks.total;
        const assignedTaskDifference =
            assignedTaskCount - lastMonthAssignedTasks.total;

        //! Incomplete Task Count Difference
        const thisMonthIncompleteTasks = await databases.listDocuments(
            DATABASE_ID,
            TASKS_ID,
            [
                Query.equal("projectId", project.$id),
                Query.notEqual("status", TaskStatus.DONE),
                Query.greaterThanEqual(
                    "$createdAt",
                    thisMonthStart.toISOString()
                ),
                Query.lessThanEqual("$createdAt", thisMonthEnd.toISOString()),
            ]
        );

        const lastMonthIncompleteTasks = await databases.listDocuments(
            DATABASE_ID,
            TASKS_ID,
            [
                Query.equal("projectId", project.$id),
                Query.notEqual("status", TaskStatus.DONE),
                Query.greaterThanEqual(
                    "$createdAt",
                    lastMonthStart.toISOString()
                ),
                Query.lessThanEqual("$createdAt", lastMonthEnd.toISOString()),
            ]
        );

        const incompleteTaskCount = thisMonthIncompleteTasks.total;
        const incompleteTaskDifference =
            incompleteTaskCount - lastMonthIncompleteTasks.total;

        //! Completed Task Count Difference
        const thisMonthCompletedTasks = await databases.listDocuments(
            DATABASE_ID,
            TASKS_ID,
            [
                Query.equal("projectId", project.$id),
                Query.equal("status", TaskStatus.DONE),
                Query.greaterThanEqual(
                    "$createdAt",
                    thisMonthStart.toISOString()
                ),
                Query.lessThanEqual("$createdAt", thisMonthEnd.toISOString()),
            ]
        );

        const lastMonthCompletedTasks = await databases.listDocuments(
            DATABASE_ID,
            TASKS_ID,
            [
                Query.equal("projectId", project.$id),
                Query.equal("status", TaskStatus.DONE),
                Query.greaterThanEqual(
                    "$createdAt",
                    lastMonthStart.toISOString()
                ),
                Query.lessThanEqual("$createdAt", lastMonthEnd.toISOString()),
            ]
        );

        const completedTaskCount = thisMonthCompletedTasks.total;
        const completedTaskDifference =
            completedTaskCount - lastMonthCompletedTasks.total;

        //! Overdue Task Count Difference
        const thisMonthOverdueTasks = await databases.listDocuments(
            DATABASE_ID,
            TASKS_ID,
            [
                Query.equal("projectId", project.$id),
                Query.notEqual("status", TaskStatus.DONE),
                Query.lessThan("dueDate", now.toISOString()),
                Query.greaterThanEqual(
                    "$createdAt",
                    thisMonthStart.toISOString()
                ),
                Query.lessThanEqual("$createdAt", thisMonthEnd.toISOString()),
            ]
        );

        const lastMonthOverdueTasks = await databases.listDocuments(
            DATABASE_ID,
            TASKS_ID,
            [
                Query.equal("projectId", project.$id),
                Query.notEqual("status", TaskStatus.DONE),
                Query.lessThan("dueDate", now.toISOString()),
                Query.greaterThanEqual(
                    "$createdAt",
                    lastMonthStart.toISOString()
                ),
                Query.lessThanEqual("$createdAt", lastMonthEnd.toISOString()),
            ]
        );

        const overdueTaskCount = thisMonthOverdueTasks.total;
        const overdueTaskDifference =
            overdueTaskCount - lastMonthOverdueTasks.total;

        return c.json({
            data: {
                taskCount,
                taskDifference,
                assignedTaskCount,
                assignedTaskDifference,
                completedTaskCount,
                completedTaskDifference,
                incompleteTaskCount,
                incompleteTaskDifference,
                overdueTaskCount,
                overdueTaskDifference,
            },
        });
    })
    .post(
        "/",
        sessionMiddleware,
        zValidator("form", createProjectSchema),
        async (c) => {
            const databases = c.get("databases");
            const storage = c.get("storage");
            const user = c.get("user");

            const { name, image, workspaceId } = c.req.valid("form");

            const member = await getMember({
                databases,
                workspaceId,
                userId: user.$id,
            });

            if (!member) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            let uploadedImageUrl: string | undefined;

            if (image instanceof File) {
                const file = await storage.createFile(
                    IMAGES_BUCKET_ID,
                    ID.unique(),
                    image
                );

                // created file buffer to preview the image, as node-appwrite SDK works differently
                const arrayBuffer = await storage.getFilePreview(
                    IMAGES_BUCKET_ID,
                    file.$id
                );

                uploadedImageUrl = `data:image/png;base64,${Buffer.from(
                    arrayBuffer
                ).toString("base64")}`;
            }

            if (uploadedImageUrl && uploadedImageUrl?.length > 1400000) {
                throw new Error("Image size should be less than 5MB");
            }

            const project = await databases.createDocument(
                DATABASE_ID,
                PROJECTS_ID,
                ID.unique(),
                {
                    name,
                    imageUrl: uploadedImageUrl,
                    workspaceId,
                }
            );

            return c.json({ data: project });
        }
    )
    .patch(
        "/:projectId",
        sessionMiddleware,
        zValidator("form", updateProjectSchema),
        async (c) => {
            const databases = c.get("databases");
            const storage = c.get("storage");
            const user = c.get("user");

            const { projectId } = c.req.param();
            const { name, image } = c.req.valid("form");

            const existingProject = await databases.getDocument<Project>(
                DATABASE_ID,
                PROJECTS_ID,
                projectId
            );

            const member = await getMember({
                databases,
                workspaceId: existingProject.workspaceId,
                userId: user.$id,
            });

            if (!member) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            let uploadedImageUrl: string | undefined;

            if (image instanceof File) {
                const file = await storage.createFile(
                    IMAGES_BUCKET_ID,
                    ID.unique(),
                    image
                );

                // created file buffer to preview the image, as node-appwrite SDK works differently
                const arrayBuffer = await storage.getFilePreview(
                    IMAGES_BUCKET_ID,
                    file.$id
                );

                uploadedImageUrl = `data:image/png;base64,${Buffer.from(
                    arrayBuffer
                ).toString("base64")}`;
            } else {
                uploadedImageUrl = image;
            }

            const project = await databases.updateDocument(
                DATABASE_ID,
                PROJECTS_ID,
                projectId,
                {
                    name,
                    imageUrl: uploadedImageUrl,
                }
            );

            return c.json({ data: project });
        }
    )
    .delete("/:projectId", sessionMiddleware, async (c) => {
        const databases = c.get("databases");
        const user = c.get("user");

        const { projectId } = c.req.param();

        const existingProject = await databases.getDocument<Project>(
            DATABASE_ID,
            PROJECTS_ID,
            projectId
        );

        const member = await getMember({
            databases,
            workspaceId: existingProject.workspaceId,
            userId: user.$id,
        });

        if (!member) {
            return c.json({ error: "Unauthorized" }, 401);
        }

        // Delete

        await databases.deleteDocument(DATABASE_ID, PROJECTS_ID, projectId);

        return c.json({ data: { $id: existingProject.$id } });
    });

export default app;
