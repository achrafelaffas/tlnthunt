import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Bold, ImagePlus, Italic, Link2, ListOrdered } from "lucide-react";
import { ListBulletIcon } from "@radix-ui/react-icons";
import Heading from "@tiptap/extension-heading";
import { useCallback } from "react";
import Image from "@tiptap/extension-image";
import CharacterCount from "@tiptap/extension-character-count";
import Link from "@tiptap/extension-link";

Heading.configure({
  levels: [1, 2, 3],
});

const extensions = [StarterKit, Image, CharacterCount, Link];

var numberOfCharaters = 0;
var numberOfWords = 0;

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) return null;

  const addImage = useCallback(() => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  numberOfCharaters = editor.storage.characterCount.characters();
  numberOfWords = editor.storage.characterCount.words();

  return (
    <div className="w-full md:w-1/2">
      <div className="grid grid-cols-5 md:grid-cols-10 lg:grid-cols-12 mb-2">
        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(editor.isActive("bold") ? "bg-primary text-white" : "")}
        >
          <Bold className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn(
            editor.isActive("italic") ? "bg-primary text-white" : ""
          )}
        >
          <Italic className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(
            editor.isActive("bulletList") ? "bg-primary text-white" : ""
          )}
        >
          <ListBulletIcon className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          type="button"
          className={cn(
            editor.isActive("orderedList") ? "bg-primary text-white" : ""
          )}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 })
              ? "bg-primary text-white"
              : ""
          }
        >
          H1
        </Button>
        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 })
              ? "bg-primary text-white"
              : ""
          }
        >
          H2
        </Button>
        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 })
              ? "bg-primary text-white"
              : ""
          }
        >
          H3
        </Button>

        <Button variant="ghost" size="icon" type="button" onClick={addImage}>
          <ImagePlus className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={setLink}
          className={editor.isActive("link") ? "bg-primary text-white" : ""}
        >
          <Link2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const Tiptap = ({
  description,
  onChange,
}: {
  description: string;
  onChange: (text: string) => void;
}) => {
  return (
    <div className="py-2 px-4" id="editor">
      <EditorProvider
        onUpdate={({ editor }) => {
          onChange(editor.getHTML());
        }}
        slotBefore={<MenuBar />}
        content={description}
        extensions={extensions}
      />
      <div className="flex flex-row w-full justify-end items-center text-xs gap-2 text-zinc-500">
        <p>{numberOfCharaters} characters</p>
        <p>|</p>
        <p> {numberOfWords} words</p>
      </div>
    </div>
  );
};

export default Tiptap;
