import { createContext, createRef, PropsWithChildren } from 'react';
import Konva from 'konva';
import { useState, useEffect } from 'react';
import { Point } from '@/types/game';
import { useWindowSize } from '@uidotdev/usehooks';

type UseBaseStageValues = {
    stageRef: React.RefObject<Konva.Stage>;

    zoom: number;
    minZoom: number;
    maxZoom: number;

    isDragging: boolean;
    startPos: { x: number; y: number };
    startStagePos: { x: number; y: number };
    masterKeyPressed: boolean;

    setZoom(zoom: number): void;
    setZoomInDecimal(zoom: number): void;
    moveTo(x: number, y: number): void;
    scaleForScreen(width: number, height: number, padding?: number): number;
    centerScreenOnObject(x: number, y: number, width: number, height: number): void;
    getMouseWorldPosition(): Point;
};

export const BaseStageContext = createContext<UseBaseStageValues | undefined>(undefined);

export function BaseStageProvider({ children }: PropsWithChildren) {
    const size = useWindowSize();

    const stageRef = createRef<Konva.Stage>();
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [startStagePos, setStartStagePos] = useState({ x: 0, y: 0 });
    const [masterKeyPressed, setIsMasterKeyPressed] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(100);

    const minZoom = 5;
    const maxZoom = 500;

    function setZoom(zoom: number) {
        if (stageRef.current) {
            const stage = stageRef.current!;
            const initialScale = zoom / 100;
            stage.scale({ x: initialScale, y: initialScale });
            setZoomLevel(zoom);
        }
    }

    function setZoomInDecimal(zoom: number) {
        setZoom(zoom * 100);
    }

    function moveTo(x: number, y: number) {
        if (!stageRef.current) return;

        const stage = stageRef.current;
        stage.setPosition({ x, y });
    }

    function scaleForScreen(objectWidth: number, objectHeight: number, padding: number = 0) {
        const baseWidth = size.width!;
        const baseHeight = size.height!;

        // Calcula a razão de escala em cada dimensão
        const widthRatio = baseWidth / (objectWidth + padding);
        const heightRatio = baseHeight / (objectHeight + padding);

        // Use o menor valor de escala para garantir que o objeto caiba na tela
        const scale = Math.min(widthRatio, heightRatio);

        return scale;
    }

    function centerScreenOnObject(x: number, y: number, width: number, height: number) {
        if (!stageRef.current) return;

        const stage = stageRef.current;
        const screenWidth = size.width!;
        const screenHeight = size.height!;

        // Calcula a posição central do objeto
        const centerX = x + width / 2;
        const centerY = y + height / 2;

        // Calcula a nova posição do stage para centralizar o objeto na tela
        const newStageX = screenWidth / 2 - centerX * stage.scaleX();
        // Ajusta o cálculo da posição Y, levando em consideração a inversão do eixo
        const newStageY = screenHeight / 2 - centerY * stage.scaleY();

        // Define a posição do stage
        stage.position({ x: newStageX, y: newStageY });

        // Redesenha o stage para aplicar as mudanças
        stage.batchDraw();
    }

    const handleWheel = (e: WheelEvent) => {
        if (!stageRef.current || !masterKeyPressed) return;
        const stage = stageRef.current!;

        const scaleBy = 1.1;
        const oldScale = stage.scaleX();
        const pointer = stage.getPointerPosition()!;

        const mousePointTo = {
            x: (pointer.x - stage.x()) / oldScale,
            y: (pointer.y - stage.y()) / oldScale,
        };

        let newScale = e.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
        const minScale = minZoom / 100;
        const maxScale = maxZoom / 100;
        newScale = Math.max(minScale, Math.min(maxScale, newScale));

        stage.scale({ x: newScale, y: newScale });

        const newPos = {
            x: pointer.x - mousePointTo.x * newScale,
            y: pointer.y - mousePointTo.y * newScale,
        };
        stage.position(newPos);
        stage.batchDraw();

        setZoomLevel(newScale * 100);
    };

    const handleMouseDown = (e: MouseEvent) => {
        if (e.button === 0 && masterKeyPressed) {
            const stage = stageRef.current!;
            setIsDragging(true);
            const pointer = stage.getPointerPosition()!;
            setStartPos(pointer);
            setStartStagePos({ x: stage.x(), y: stage.y() });
        }
    };

    const handleMouseMove = () => {
        if (!isDragging) return;
        const stage = stageRef.current!;
        const pointer = stage.getPointerPosition()!;
        const dx = pointer.x - startPos.x;
        const dy = pointer.y - startPos.y;
        stage.position({
            x: startStagePos.x + dx,
            y: startStagePos.y + dy,
        });
        stage.batchDraw();
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.code === 'Space') {
            setIsMasterKeyPressed(true);
        }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
        if (e.code === 'Space') {
            setIsMasterKeyPressed(false);
        }
    };

    const getMouseWorldPosition = () => {
        if (!stageRef.current) return { x: 0, y: 0 };
        const stage = stageRef.current;
        const canvasPos = stage.getRelativePointerPosition()!;
        return { x: canvasPos.x, y: -canvasPos.y };
    };

    useEffect(() => {
        window.addEventListener('wheel', handleWheel);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [stageRef]);

    return (
        <BaseStageContext.Provider
            value={{
                stageRef,

                zoom: zoomLevel,
                minZoom,
                maxZoom,

                isDragging,
                startPos,
                startStagePos,
                masterKeyPressed,

                setZoom,
                setZoomInDecimal,
                moveTo,
                scaleForScreen,
                centerScreenOnObject,
                getMouseWorldPosition,
            }}
        >
            {children}
        </BaseStageContext.Provider>
    );
}
