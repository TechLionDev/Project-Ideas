import { PrismaClient } from "@prisma/client";
import { permanentRedirect } from "next/navigation";

interface Params {
    slug: string;
}

export default async function Page({ params }: { params: Params }) {
    let prisma = new PrismaClient();
    let urls = await prisma.uRL.findMany();
    let url = urls.find((u) => u.slug === params.slug[0]);
    
    if (!url) {
        permanentRedirect("/");
    }
    await prisma.click.create({
        data: {
            urlId: url.id
        }
    });
    permanentRedirect(url.longURL)
}
