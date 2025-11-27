import React, { Suspense } from 'react';
import QnaList from './QnaList';

export default function QnaBoard() {
  return (
    <Suspense fallback={<p>로딩중 입니다...</p>}>
      <QnaList />
    </Suspense>
  );
}