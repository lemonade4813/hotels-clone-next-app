import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react'

export default function page() {
    const CREATE_QNA = gql`
        mutation CreateQna($title: String!, $content: String!, $author: String!) {
            createQna(title: $title, content: $content, author: $author) {
            _id
            title
            content
            author
            }
        }
    `;

    const [createQna, { loading, error, data }] = useMutation(CREATE_QNA, {
        refetchQueries: ["GetQnaList"], 
      });

      const [form, setForm] = useState({
        title: "",
        content: "",
        author: "",
      });
    
      const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          await createQna({
            variables: {
              title: form.title,
              content: form.content,
              author: form.author,
            },
          });
          setForm({ title: '', content: '', author: '' });
        } catch (err : any) {
            throw new Error(err.message || 'QnA 등록 중 오류가 발생했습니다.');
        }
      };

    return (
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='title'>제목</label>
                    <input id='title' name='title' onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor='content'>내용</label>
                    <textarea id='content' name='content' onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor='author'>작성자</label>
                    <input value='abc' name='author' readOnly onChange={handleChange}/>
                </div>
            </form>
    )
}
