import React from 'react'
import FaqItem from './FaqItem'

export default function FaqList() {


    const faqList = [
        { item : 'pool', question : '파르나스 호텔 제주에 수영장이 있나요?', answer : '예, 실내 수영장, 야외 수영장, 어린이 수영장이 있습니다.'},
        { item : 'pet', question : '파르나스 호텔 제주에 반려동물 동반이 가능한가요?', answer : '죄송하지만 반려동물을 동반하실 수 없습니다. 단, 장애인 안내 동물은 동반 가능합니다.'},
        { item : 'parking', question : '파르나스 호텔 제주에 주차장이 있나요?', answer : '예, 무료 셀프 주차 이용이 가능합니다. 전기차 충전도 가능합니다.'},
        { item : 'checkIn', question : '파르나스 호텔 제주의 체크인 시간과 체크아웃 시간은 언제인가요?', answer : '체크인 시작 시간은 15:00이며, 체크인 종료 시간은 자정입니다. 체크아웃 시간은 11:00입니다. 비대면 체크인이 가능합니다.'},
        { item : 'casino', question : '파르나스 호텔 제주 안에 카지노가 있나요?', answer : '아니요, 이 호텔에는 카지노가 없지만, 제주신화월드(차로 19분 거리) 같은 곳이 근처에 있어요.'},
        { item : 'amusement', question : '파르나스 호텔 제주 및 인근에서 즐길만한 것은 무엇인가요?', answer : '파르나스 호텔 제주에는 스파, 야외 수영장뿐만 아니라 피트니스 센터도 마련되어 있습니다.'},
        { item : 'restaurant', question : '파르나스 호텔 제주 내 또는 인근에 레스토랑이 있나요?', answer : '예, 시설 내 레스토랑이 있습니다.'},
        { item : 'outdoor', question : '파르나스 호텔 제주에는 전용 야외 공간이 있나요?', answer : '예, 모든 객실에는 발코니 같은 편의 시설이 마련되어 있습니다.'},
        { item : 'circumstance', question : '파르나스 호텔 제주 주변에는 무엇이 있나요?', answer : '중문의 중문 색달해변 인근에 자리한 파르나스 호텔 제주에서 걸어서 14분이면 제주 테디베어뮤지엄, 9분이면 중문 골프 클럽에 가실 수 있습니다.'}
    ]

  return (
        <ul style={{ flex : 1 }}>
        {faqList.map(faq => (
            <li key={faq.item}>
                <FaqItem 
                    item={faq.item} 
                    question={faq.question} 
                    answer={faq.answer}
                />
            </li>
        ))
        }
    </ul>
  )
}
