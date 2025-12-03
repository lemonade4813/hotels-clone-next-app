"use client"

import React, { useState } from 'react'
import styles from './RoomGuestsSelector.module.css';
import PersonSvg from "@/app/assets/person.svg";
import Image from 'next/image';
import Link from 'next/link';


interface IRoomGuests{
    adults : number;
    children : number;
}  

export default function RoomGuestsSelector() {

    const [roomGuestsInfo, setRoomGuestsInfo] = useState<Array<IRoomGuests>>([{ adults : 0, children : 0 }])
    const [isSelectorModalOpen, setIsSelectorModalOpen] = useState(false);


    const AddRoomGuestsInfo = () => {
        setRoomGuestsInfo(prev => [...prev, { adults: 0, children: 0 }]);
    };

    const deleteRoomGuestsInfo = (index: number) => {
        setRoomGuestsInfo(prev => prev.filter((_, i) => i !== index));
    };

    const addGuest = (index: number, type: "adults" | "children") => {
        setRoomGuestsInfo(prev => {
            const newState = [...prev];
            newState[index] = { ...newState[index], [type]: newState[index][type] + 1 };
            return newState;
        });
    };

    const reduceGuest = (index: number, type: "adults" | "children") => {
        setRoomGuestsInfo(prev => {
            const newState = [...prev];
            newState[index] = { ...newState[index], [type]: Math.max(0, newState[index][type] - 1) };
            return newState;
        });
    };

    const totalRooms = roomGuestsInfo.length;
    const totalGuests = roomGuestsInfo.reduce(
        (sum, room) => sum + room.adults + room.children, 0
    );

    return (
    <div className={styles.roomGuestsContainer} 
         onClick={() => setIsSelectorModalOpen(true)}>
        <Image src={PersonSvg} alt="인원 수 이미지" />
        <div className={styles.criteriaField}>
            <p>인원 수</p>
            <p>객실 {totalRooms}개 {totalGuests}명</p>
        </div>
        {isSelectorModalOpen &&
            <div className={styles.roomGuestsInfoWrapper}>
                {roomGuestsInfo.map((item, index)=> 
                    <div className={styles.roomGuestsItemWrapper}>
                        <p>객실 {index + 1}</p>
                        <div className={styles.roomGuestsCountsWrapper}>
                            <div style={{height : '30px'}}>
                                <p>성인</p>
                            </div>
                            <div className={styles.plusMinusButtonWrapper}>
                                <button
                                    className={styles.plusMinusButton}
                                    disabled={item.adults === 0}
                                    onClick={() => reduceGuest(index, "adults")}>
                                    -
                                </button>
                                <p>{item.adults}</p>
                                <button
                                    className={styles.plusMinusButton}
                                    onClick={() => addGuest(index, "adults")}>
                                    +
                                </button>
                            </div>
                        </div>
                        <div className={styles.roomGuestsCountsWrapper}>
                            <div style={{height : '30px'}}>
                                <p>아동</p>
                                <p style={{fontSize : '10px'}}>만 0~17세</p>
                            </div>
                            <div className={styles.plusMinusButtonWrapper}>
                                <button className={styles.plusMinusButton}
                                    onClick={() => reduceGuest(index, "children")}>
                                    -
                                </button>    
                                <p>{item.children}</p>
                                <button className={styles.plusMinusButton}
                                    onClick={() => addGuest(index, "children")}>
                                    +
                                </button>
                            </div>
                        </div>
                        {roomGuestsInfo.length > 1 && (
                            <p 
                                className={styles.roomDeleteButton} 
                                onClick={() => deleteRoomGuestsInfo(index)}
                            >
                                객실 삭제
                            </p>
                        )}
                    </div>
                )}
                    <p onClick={AddRoomGuestsInfo} className={styles.roomAddButton}>객실 추가</p>
                    <div className={styles.bottomWrapper}>
                        <Link 
                            href='#' 
                            style={{ color : '#1668E3'}}
                        >
                            9개 이상 객실 예약
                        </Link>
                        <button
                            className={styles.confirmButton}
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsSelectorModalOpen(false);
                            }}
                        >완료
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}
