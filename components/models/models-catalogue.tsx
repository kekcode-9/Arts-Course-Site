"use client";
import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { DocumentData } from "firebase/firestore";
import { getAllDocumentsInCollection } from "@/lib/firebase/firestore-access";
import dbCollections from "@/utilities/constants/dbCollections";
import { ModelType } from "@/utilities/types";
import {
  ImageCard,
  ImageCardSkeleton,
} from "../references/reference-catalogue";
import ImageViewer from "../utility-components/image-viewer";

const { MODELS } = dbCollections;

export default function ModelsCatalogue() {
  const [models, setModels] = useState<DocumentData[]>();
  const [showViewer, setShowViewer] = useState(false);
  const [focusedImage, setFocusedImage] =
    useState<[string, [string, string]]>();

  useEffect(() => {
    getAllDocumentsInCollection(MODELS)
      .then((allDocs) => setModels(allDocs))
      .catch((error) => console.log(`error getting models: ${error}`));
  }, []);

  const onImageClick = (image: string, size: [string, string]) => {
    setShowViewer(true);
    setFocusedImage([image, size]);
  };

  return (
    <>
        {showViewer && focusedImage && (
            <ImageViewer
                image={focusedImage[0] as string}
                alt="reference image"
                size={focusedImage[1]}
                onClose={() => setShowViewer(false)}
            />
        )}
        <div
        className="reference-catalogue-wrapper
            flex flex-col gap-12
            w-screen 
            h-screen lg:h-full
            pt-[8.5rem] sm:pt-[10.5rem] max-sm:pb-24 pb-16"
        >
            <div
                className="flex flex-col
                w-full h-full"
            >
                <div
                className="references-wrapper
                  flex flex-wrap justify-center gap-6 sm:gap-8
                  w-full h-full
                  overflow-y-auto py-4"
                >
                {models
                    ? models.map((model, i) => {
                        return (
                        <ImageCard
                          key={i}
                          refDoc={model as ModelType}
                          onClick={onImageClick}
                        />
                        );
                    })
                    : new Array(16).fill("").map((item, i) => {
                        return <ImageCardSkeleton key={i} />;
                    })}
                </div>
            </div>
        </div>
    </>
  );
}
