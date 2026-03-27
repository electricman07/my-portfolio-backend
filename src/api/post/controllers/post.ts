/**
 * post controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::post.post",
  ({ strapi }) => ({
    async getArchives(ctx) {
      // 1. Fetch only the createdAt field for all published posts
      const entries = await strapi.db.query("api::post.post").findMany({
        select: ["createdAt"],
        where: { publishedAt: { $notNull: true } },
        orderBy: { createdAt: "desc" },
      });

      // 2. Reduce the dates into a unique list of YYYY-MM
      const archives = entries.reduce((acc: any[], entry) => {
        const date = new Date(entry.createdAt);
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear().toString();
        const key = `${year}-${month}`;

        if (!acc.find((item) => item.key === key)) {
          acc.push({
            key,
            year,
            month,
            label: date.toLocaleString("default", {
              month: "long",
              year: "numeric",
            }),
          });
        }
        return acc;
      }, []);

      return { data: archives };
    },
  }),
);
