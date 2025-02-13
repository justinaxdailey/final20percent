import { defineStackbitConfig, SiteMapEntry } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
    stackbitVersion: "~0.7.0",
    ssgName: "nextjs",
    nodeVersion: "18",
    contentSources: [
        new GitContentSource({
            rootPath: __dirname,
            contentDirs: ["content"],
            models: [
                {
                    name: "page",
                    type: "page",
                    urlPath: "/{slug}",
                    filePath: "content/pages/{slug}.json",
                    fields: [
                        { name: "title", type: "string", required: true },
                        { name: "body", type: "markdown", required: true }
                    ],
                    page: true
                }
            ]
        })
    ],
    siteMap: ({ documents }) => documents
        .filter((doc) => doc.modelName === "page")
        .map((doc) => ({
            stableId: doc.id,
            urlPath: `/${doc.fields.slug || doc.id}`,
            document,
        })) as SiteMapEntry[]
});
