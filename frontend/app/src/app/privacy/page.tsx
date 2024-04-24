import styles from "@/app/privacy/privacy.module.scss";
import Header from "@/app/components/layouts/header/Header";
import Footer from "@/app/components/layouts/footer/Footer";

export default function Terms() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.mainContainer}>
        <h1 className={styles.title}>プライバシーポリシー</h1>
        <p className={styles.paragraph}>
          「SaboLearn」（以下「当方」といいます。）がこのウェブサイトで提供するサービス（以下「本サービス」といいます。）における、ユーザーについての個人情報を含む利用者情報の取扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます。）を定めます。
        </p>
        <h2 className={styles.heading}>収集する利用者情報及び収集方法</h2>
        <p className={styles.paragraph}>
          本ポリシーにおいて、「利用者情報」とは、ユーザーの識別に係る情報、通信サービス上の行動履歴、その他ユーザーまたはユーザーの端末に関連して生成または蓄積された情報であって、本ポリシーに基づき当方が収集するものを意味するものとします。本サービスにおいて当方が収集する利用者情報は、その収集方法に応じて、以下のようなものとなります。
        </p>
        <ol className={`${styles.paragraph} ${styles.childOl}`}>
          <li className={styles.childList}>
            ユーザーからご提供いただく情報
            <br />
            本サービスを利用するために、または本サービスの利用を通じてユーザーからご提供いただく情報は以下のとおりです。
            <ol>
              <li>メールアドレス</li>
              <li>パスワード</li>
              <li>ニックネーム</li>
              <li>職業</li>
              <li>生年月日</li>
            </ol>
          </li>
          <li className={styles.childList}>
            ユーザーが本サービスの利用において、他のサービスと連携を許可することにより、当該他のサービスからご提供いただく情報
            <br />
            ユーザーが、本サービスを利用するにあたり、ソーシャルネットワーキングサービス等の他のサービスとの連携を許可した場合には、その許可の際にご同意いただいた内容に基づき、以下の情報を当該外部サービスから収集します
            <ol>
              <li>当該外部サービスでユーザーが利用するID</li>
              <li>
                その他当該外部サービスのプライバシー設定によりユーザーが連携先に開示を認めた情報
              </li>
            </ol>
          </li>
          <li className={styles.childList}>
            ユーザーが本サービスを利用するにあたって、当方が収集する情報
            <br />
            当方は、本サービスへのアクセス状況やそのご利用方法に関する情報を収集することがあります。これには以下の情報が含まれます。
            <ol>
              <li>リファラ</li>
              <li>IPアドレス</li>
              <li>サーバーアクセスログに関する情報</li>
              <li>Cookie、ADID、IDFAその他の識別子</li>
            </ol>
          </li>
        </ol>
        <h2 className={styles.heading}>利用目的</h2>
        <p className={styles.paragraph}>
          本サービスのサービス提供にかかわる利用者情報の具体的な利用目的は以下のとおりです。
        </p>
        <ol className={`${styles.paragraph} ${styles.childOl}`}>
          <li className={styles.childList}>
            本サービスに関する登録の受付、本人確認、ユーザー認証、ユーザー設定の記録、利用料金の決済計算等本サービスの提供、維持、保護及び改善のため
          </li>
          <li className={styles.childList}>
            ユーザーのトラフィック測定及び行動測定のため
          </li>
          <li className={styles.childList}>
            本サービスに関するご案内、お問い合わせ等への対応のため
          </li>
          <li className={styles.childList}>
            本サービスに関する当方の規約、ポリシー等（以下「規約等」といいます。）に違反する行為に対する対応のため
          </li>
          <li className={styles.childList}>
            本サービスに関する規約等の変更などを通知するため
          </li>
        </ol>

        <h2 className={styles.heading}>第三者提供</h2>
        <p className={styles.paragraph}>
          当方は、利用者情報のうち、個人情報については、あらかじめユーザーの同意を得ないで、第三者（日本国外にある者を含みます。）に提供しません。但し、次に掲げる必要があり第三者（日本国外にある者を含みます。）に提供する場合はこの限りではありません。
        </p>
        <ol className={`${styles.paragraph} ${styles.childOl}`}>
          <li className={styles.childList}>
            当方が利用目的の達成に必要な範囲内において個人情報の取扱いの全部または一部を委託する場合
          </li>
          <li className={styles.childList}>
            合併その他の事由による事業の承継に伴って個人情報が提供される場合
          </li>
          <li className={styles.childList}>
            第4項の定めに従って、提携先または情報収集モジュール提供者へ個人情報が提供される場合
          </li>
          <li className={styles.childList}>
            国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、ユーザーの同意を得ることによって当該事務の遂行に支障を及ぼすおそれがある場合
          </li>
          <li className={styles.childList}>
            その他、個人情報の保護に関する法律（以下「個人情報保護法」といいます。）その他の法令で認められる場合
          </li>
        </ol>

        <h2 className={styles.heading}>個人情報の訂正及び利用停止等</h2>
        <ol className={`${styles.paragraph} ${styles.childOl}`}>
          <li className={styles.childList}>
            当方は、ユーザーから、個人情報が真実でないという理由によって個人情報保護法の定めに基づきその内容の訂正を求められた場合、及びあらかじめ公表された利用目的の範囲を超えて取扱われているという理由または偽りその他不正の手段により収集されたものであるという理由により、個人情報保護法の定めに基づきその利用の停止を求められた場合には、ユーザーご本人からのご請求であることを確認の上で遅滞なく必要な調査を行い、その結果に基づき、個人情報の内容の訂正または利用停止を行い、その旨をユーザーに通知します。なお、訂正または利用停止を行わない旨の決定をしたときは、ユーザーに対しその旨を通知いたします。
          </li>
          <li className={styles.childList}>
            当方は、ユーザーから、ユーザーの個人情報について消去を求められた場合、当方が当該請求に応じる必要があると判断した場合は、ユーザーご本人からのご請求であることを確認の上で、個人情報の消去を行い、その旨をユーザーに通知します。
          </li>
          <li className={styles.childList}>
            個人情報保護法その他の法令により、当方が訂正等または利用停止等の義務を負わない場合は、4-1および4-2の規定は適用されません。
          </li>
        </ol>
        <h2 className={styles.heading}>お問い合わせ窓口</h2>
        <p className={styles.paragraph}>
          ご意見、ご質問、苦情のお申出その他利用者情報の取扱いに関するお問い合わせは、下記の窓口までお願いいたします。
        </p>
        <p className={styles.paragraph}>連絡先 : sabolearn@gmail.com</p>

        <h2 className={styles.heading}>プライバシーポリシーの変更手続</h2>
        <p className={styles.paragraph}>
          当方は、必要に応じて、本ポリシーを変更します。但し、法令上ユーザーの同意が必要となるような本ポリシーの変更を行う場合、変更後の本ポリシーは、当方所定の方法で変更に同意したユーザーに対してのみ適用されるものとします。なお、当方は、本ポリシーを変更する場合には、変更後の本ポリシーの施行時期及び内容を当方のウェブサイト上での表示その他の適切な方法により周知し、またはユーザーに通知します。
        </p>
        <p>【2024年3月21日制定】</p>
      </main>
      <Footer />
    </div>
  );
}
