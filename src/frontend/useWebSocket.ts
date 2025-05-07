import { useRef, useState } from "react";

export interface WebSocketEvent {
  id: string;
  createdAt: number;
  data?: string;
  type: "MESSAGE" | "CLOSE" | "OPEN" | "CONNECTING";
}

export const useWebSocket = () => {
  const ws = useRef<null | WebSocket>(null);

  const [events, setEvents] = useState<WebSocketEvent[]>([]);

  const connect = (url: string) => {
    setEvents([]);
    if (ws.current) {
      ws.current.onclose = null;
    }
    ws.current?.close();

    setEvents([
      { id: crypto.randomUUID(), type: "CONNECTING", createdAt: Date.now() },
    ]);

    ws.current = new WebSocket(url);
    ws.current.onopen = () => {
      console.log("open");
      setEvents((e) => [
        { id: crypto.randomUUID(), type: "OPEN", createdAt: Date.now() },
        ...e,
      ]);
    };

    ws.current.onmessage = (event) => {
      console.log("message", event.data);
      setEvents((e) => [
        {
          id: crypto.randomUUID(),
          data: event.data,
          type: "MESSAGE",
          createdAt: Date.now(),
        },
        ...e,
      ]);
    };

    ws.current.onclose = () => {
      console.log("close");
      setEvents((e) => [
        { id: crypto.randomUUID(), type: "CLOSE", createdAt: Date.now() },
        ...e,
      ]);
    };
  };

  return { connect, ws, events };
};

export type UseWebSocket = ReturnType<typeof useWebSocket>;
