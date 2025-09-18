import { gql, useSuspenseQuery } from '@apollo/client';
import React, { Suspense } from 'react';

export interface IQnaItem {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

const GET_QNA_LIST = gql`
  query GetQnaList {
    qnaList {
      _id
      title
      content
      author
      createdAt
    }
  }
`;


function QnaBoardContent() {
    const { data } = useSuspenseQuery<{ qnaList: IQnaItem[] }>(GET_QNA_LIST, {
        errorPolicy: 'all',
      });
    
  
    const qnaList = data?.qnaList ?? [];
  
    return (
      <div>
        {qnaList.length === 0 ? (
          <p>게시물이 없습니다.</p>
        ) : (
          qnaList.map((qnaItem) => (
            <article key={qnaItem._id}>
              <h3>{qnaItem.title}</h3>
              <p>{qnaItem.content}</p>
              <p>{qnaItem.author}</p>
              <small>{new Date(qnaItem.createdAt).toLocaleString()}</small>
            </article>
          ))
        )}
      </div>
    );
  }

export default function QnaBoard() {
  return (
    <Suspense fallback={<p>로딩중 입니다...</p>}>
      <QnaBoardContent />
    </Suspense>
  );
}