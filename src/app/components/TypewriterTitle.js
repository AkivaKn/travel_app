"use client";
import Typewriter from "typewriter-effect";

export default function TypewriterTitle({ strArray }) {
  return (
    <Typewriter
      options={{
        strings: strArray,
        autoStart: true,
        loop: true,
      }}
    />
  );
}
