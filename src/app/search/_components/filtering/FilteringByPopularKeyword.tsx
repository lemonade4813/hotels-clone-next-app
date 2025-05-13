import React from 'react'

export default function FilteringByPopularKeyword() {
  return (
    <fieldset style={{border : 'none'}}>
        <legend>인기 필터</legend>
        <div>
            <input type="checkbox"/>
            <label>바다 전망</label>
        </div>
        <div>
            <input type="checkbox"/>
            <label>스파</label>
        </div>
        <div>
            <input type="checkbox"/>
            <label>반려동물 동반 가능</label>
        </div>
    </fieldset>
  )
}
