/**
 * This file contains the root router of your tRPC-backend
 */
import { createRouter } from "../createRouter";
import { postRouter } from "./post";
import { listRouter } from "./list";
import { notificationRouter } from "./notification";

/**
 * Create your application's root router
 * If you want to use SSG, you need export this
 * @link https://trpc.io/docs/ssg
 * @link https://trpc.io/docs/router
 */
export const appRouter = createRouter()
  /**
   * Optionally do custom error (type safe!) formatting
   * @link https://trpc.io/docs/error-formatting
   */
  // .formatError(({ shape, error }) => { })
  /**
   * Merge `listRouter` under `list.`
   */
  .merge("list.", listRouter)
  /**
   * Merge `postRouter` under `post.`
   */
  .merge("notification.", notificationRouter)
  /**
   * Merge `postRouter` under `post.`
   */
  .merge("post.", postRouter);

export type AppRouter = typeof appRouter;
