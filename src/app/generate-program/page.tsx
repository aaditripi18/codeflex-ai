"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { vapi } from "@/lib/vapi";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const GenerateProgramPage = () => {
  const [callActive, setCallActive] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [callEnded, setCallEnded] = useState(false);

  const { user } = useUser();
  const router = useRouter();
  const messageContainerRef = useRef<HTMLDivElement>(null);

  /* -------------------------------------------------- */
  /* SILENCE DAILY / VAPI "MEETING ENDED" WARNINGS      */
  /* -------------------------------------------------- */
  useEffect(() => {
    const handler = (e: PromiseRejectionEvent) => {
      if (
        typeof e.reason?.message === "string" &&
        e.reason.message.includes("Meeting ended")
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener("unhandledrejection", handler);
    return () => window.removeEventListener("unhandledrejection", handler);
  }, []);

  /* Auto-scroll messages */
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  /* Redirect after call ends */
  useEffect(() => {
    if (callEnded) {
      const timer = setTimeout(() => {
        router.push("/profile");
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [callEnded, router]);

  /* -------------------------------------------------- */
  /* VAPI EVENT LISTENERS                               */
  /* -------------------------------------------------- */
  useEffect(() => {
    const handleCallStart = () => {
      setConnecting(false);
      setCallActive(true);
      setCallEnded(false);
    };

    const handleCallEnd = () => {
      setCallActive(false);
      setConnecting(false);
      setIsSpeaking(false);
      setCallEnded(true);
    };

    const handleSpeechStart = () => {
      setIsSpeaking(true);
    };

    const handleSpeechEnd = () => {
      setIsSpeaking(false);
    };

    const handleMessage = (message: any) => {
      if (message?.type === "transcript" && message.transcriptType === "final") {
        setMessages((prev) => [
          ...prev,
          { content: message.transcript, role: message.role },
        ]);
      }
    };

    vapi
      .on("call-start", handleCallStart)
      .on("call-end", handleCallEnd)
      .on("speech-start", handleSpeechStart)
      .on("speech-end", handleSpeechEnd)
      .on("message", handleMessage);

    return () => {
      vapi
        .off("call-start", handleCallStart)
        .off("call-end", handleCallEnd)
        .off("speech-start", handleSpeechStart)
        .off("speech-end", handleSpeechEnd)
        .off("message", handleMessage);
    };
  }, []);

  /* -------------------------------------------------- */
  /* START / STOP CALL                                  */
  /* -------------------------------------------------- */
  const toggleCall = async () => {
    if (callActive) {
      vapi.stop();
      return;
    }

    try {
      setConnecting(true);
      setMessages([]);
      setCallEnded(false);

      await vapi.start(
        process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!
      );

    } catch {
      setConnecting(false);
    }
  };

  /* -------------------------------------------------- */
  /* UI                                                 */
  /* -------------------------------------------------- */
  return (
    <div className="flex flex-col min-h-screen text-foreground overflow-hidden pb-6 pt-24">
      <div className="container mx-auto px-4 h-full max-w-5xl">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-mono">
            Generate Your{" "}
            <span className="text-primary uppercase">Fitness Program</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Have a voice conversation with our AI assistant
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

          {/* AI CARD */}
          <Card className="bg-card/90 border border-border">
            <div className="aspect-video flex flex-col items-center justify-center p-6">
              <img
                src="/ai-avatar.png"
                alt="AI Assistant"
                className="size-32 rounded-full object-cover mb-4"
              />
              <h2 className="text-xl font-bold">CodeFlex AI</h2>
              <p className="text-sm text-muted-foreground">
                {isSpeaking
                  ? "Speaking..."
                  : callActive
                  ? "Listening..."
                  : callEnded
                  ? "Finished"
                  : "Waiting..."}
              </p>
            </div>
          </Card>

          {/* USER CARD */}
          <Card className="bg-card/90 border border-border">
            <div className="aspect-video flex flex-col items-center justify-center p-6">
              <img
                src={user?.imageUrl}
                alt="User"
                className="size-32 rounded-full object-cover mb-4"
              />
              <h2 className="text-xl font-bold">You</h2>
              <p className="text-sm text-muted-foreground">
                {user ? `${user.firstName} ${user.lastName || ""}` : "Guest"}
              </p>
            </div>
          </Card>
        </div>

        {/* MESSAGES */}
        {messages.length > 0 && (
          <div
            ref={messageContainerRef}
            className="bg-card border rounded-xl p-4 mb-6 h-64 overflow-y-auto"
          >
            {messages.map((msg, i) => (
              <div key={i} className="mb-2">
                <strong>{msg.role === "assistant" ? "AI" : "You"}:</strong>{" "}
                {msg.content}
              </div>
            ))}
          </div>
        )}

        {/* CALL BUTTON */}
        <div className="flex justify-center">
          <Button
            onClick={toggleCall}
            disabled={connecting || callEnded}
            className="w-40 text-lg rounded-3xl"
          >
            {callActive
              ? "End Call"
              : connecting
              ? "Connecting..."
              : callEnded
              ? "View Profile"
              : "Start Call"}
          </Button>
        </div>

      </div>
    </div>
  );
};

export default GenerateProgramPage;
