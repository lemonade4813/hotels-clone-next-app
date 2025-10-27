
export default function ReviewItem() {

  const rating  = 6;


  return (
    <div style={{ 
        border : '1px solid #DFE0E4', 
        borderRadius : '20px'
    }}>
      <p>{rating}/10 별로에요</p>
      <p>
        Lorem ipsum dolor sit amet, 
        consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore 
        et dolore magna aliqua. 
        Ut enim ad minim veniam, 
        quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat. 
        Duis aute irure dolor in reprehenderit in voluptate velit 
        esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident,
        sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <p>더 보기</p>
      <div>
        <p>실제 이용 고객</p>
        <p>2025년 7월 27일</p>
      </div>
    </div>
  )
}
