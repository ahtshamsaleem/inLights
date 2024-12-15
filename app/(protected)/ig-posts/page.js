"use client"

import InstaPosts from "@/components/InstaPosts/InstaPosts";
import { Suspense } from "react";

export default function PostsPage() {

    return (
        <>
            <Suspense>
            <InstaPosts />
            </Suspense>
        </>
    )
}