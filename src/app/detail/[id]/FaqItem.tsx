import React, { useState } from 'react'
import styles from './FaqItem.module.css';
import ArrowImage2 from '@/app/components/common/ArrowImage2';

export default function FaqItem({ answer, question } : { item : string , answer : string, question : string }) {

    const [isToggled, setIsToggled] = useState(false);
  
    return (
        <div className={styles.faqItemWrapper}>
            <div className={styles.faqQuestionWrapper} onClick={()=>setIsToggled(prev => !prev)}>
                <ArrowImage2 isToggled={isToggled}/>
                <p className={styles.faqQuestion}>{question}</p>
            </div>
            <p className={isToggled ? styles.faqToggled : styles.faqAnswer}>{answer}</p>
        </div>

  )
}
