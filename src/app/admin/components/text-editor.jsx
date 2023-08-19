'use client'

import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";



const TextEditor = ({onChange,content}) => {
    const editorRef = useRef(content) 
    const handleOnChange = (a,e)=>{
        if(onChange && e)
        onChange(editorRef.current.getContent());
    }
    return (<div className="h-[250px]">
        <Editor
        apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
        onEditorChange={handleOnChange}
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue={content}
        init={{
            height: 250,
            branding:false,
            menubar: false,
            resize:false,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}
      />

    </div>);
}
 
export default TextEditor;