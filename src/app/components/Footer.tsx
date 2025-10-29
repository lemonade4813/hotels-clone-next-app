import styles from './footer.module.css'


export default function Footer() {
  return (
    <div className={styles.footerWrapper}>
        <p className={styles.notice}>* 일부 호텔은 체크인 24시간 이상 전에 취소해야 합니다. 자세한 내용은 사이트에서 확인해 주세요.</p>
        <p className={styles.notice}>© 2025 Hotels.com, Expedia Group 계열사. All rights reserved.</p>
        <p className={styles.notice}>Hotels.com 및 Hotels.com 로고는 미국 및/또는 다른 국가에서 Hotels.com, LP의 상표 또는 등록 상표입니다. 기타 모든 상표는 해당 소유권자의 자산입니다.</p>
        <p className={styles.notice}> 분쟁 해결: 전화: 82-3480-0145, 이메일: CS@koreasupport.hotels.com</p>
        <p className={styles.notice}>트래블파트너익스체인지코리아 주식회사. 사업자등록번호: 821-88-01025</p>
        <address className={styles.address}>익스피디아트래블코리아 주식회사, 서울특별시 종로구 종로5길 7(청진동). 사업자등록번호: 724-86-00245</address>
    </div>
  )
}
