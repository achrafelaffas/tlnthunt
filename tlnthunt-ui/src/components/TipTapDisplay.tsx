import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
const extensions = [StarterKit];

const TiptapDisplay = ({ description }: { description: string }) => {
  return (
    <EditorProvider
      editable={false}
      extensions={extensions}
      content={description}
    />
  );
};

export default TiptapDisplay;
