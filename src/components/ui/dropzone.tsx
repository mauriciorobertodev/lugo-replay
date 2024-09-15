import { useDropzone } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
    onDrop(files: File[]): void;
};

export function FileDropzone({ onDrop }: Props) {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles: 1 });

    return (
        <div
            {...getRootProps()}
            className={cn(
                'flex flex-col items-center justify-center w-full h-48 p-4 border-2 border-dashed rounded-lg cursor-pointer',
                isDragActive ? 'border-blue-500 bg-blue-500/20' : 'border border-dashed',
            )}
        >
            <input {...getInputProps()} />
            <UploadCloud className="w-10 h-10 text-gray-500" />
            <p className="mt-2 text-sm text-gray-600">
                {isDragActive
                    ? 'Solte o arquivo aqui...'
                    : 'Arraste e solte um arquivo ou clique para selecionar'}
            </p>
        </div>
    );
}
