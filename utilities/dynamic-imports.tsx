import dynamic from "next/dynamic";

export default function dynamicImports (filename: string, componentName: string, key?: string) {
    const ImportedComponent = dynamic(() => import(`../components/home/${filename}`)
    .then((module) => module[componentName]), {
        loading: () => <p>Loading...</p>
    });
    return <ImportedComponent key={key} />
}