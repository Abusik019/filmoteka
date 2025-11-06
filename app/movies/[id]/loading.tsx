import Loader from "@app/ui/loader";
import React from "react";

export default function Loading() {
    return (
        <div className="bg-[#1f2833] flex items-center justify-center min-h-screen text-[#66fcf0]">
            <Loader />
        </div>
    );
}
