import Link from "next/link";
import Image from "next/image";
import styles from "@/app/terms/terms.module.scss";

export default function Terms() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/">
          <Image
            className={styles.logo}
            src="/logo.png"
            width={148}
            height={35}
            alt="logo"
          ></Image>
        </Link>
      </header>
      <main className={styles.mainContainer}>
        <h1 className={styles.title}>利用規約</h1>
        <p className={styles.paragraph}>
          本利用規約（以下「本規約」と言います。）には、「SaboLearn」（以下「当方」といいます。）がこのウェブサイトで提供するサービス（以下「本サービス」といいます。）の提供条件及び当方と登録ユーザーの皆様との間の権利義務関係が定められています。本サービスの利用に際しては、本規約の全文をお読みいただいたうえで、本規約に同意いただく必要があります。
        </p>

        <h2 className={styles.heading}>第1条(適用)</h2>
        <ol className={styles.paragraph}>
          <li className={styles.list}>
            本規約は、本サービスの提供条件及び本サービスの利用に関する当方と登録ユーザーとの間の権利義務関係を定めることを目的とし、登録ユーザーと当方との間の本サービスの利用に関わる一切の関係に適用されます。
          </li>
          <li className={styles.list}>
            当方が当方ウェブサイト上で掲載する本サービス利用に関するルール（
            <Link href={"/terms"}>https://app.sabolearn.com/terms</Link>
            ）は、本規約の一部を構成するものとします。
          </li>
          <li className={styles.list}>
            本規約の内容と、前項のルールその他の本規約外における本サービスの説明等とが異なる場合は、本規約の規定が優先して適用されるものとします。
          </li>
        </ol>

        <h2 className={styles.heading}>第2条(登録)</h2>
        <ol className={styles.paragraph}>
          <li className={styles.list}>
            本サービスの利用を希望する者（以下「登録希望者」といいます。）は、本規約を遵守することに同意し、かつ当方の定める一定の情報（以下「登録事項」といいます。）を当方の定める方法で当方に提供することにより、当方に対し、本サービスの利用の登録を申請することができます。
          </li>
          <li className={styles.list}>
            当方は、当方の基準に従って、第１項に基づいて登録申請を行った登録希望者（以下「登録申請者」といいます。）の登録の可否を判断し、当方が登録を認める場合にはその旨を登録申請者に通知します。登録申請者の登録ユーザーとしての登録は、当方が本項の通知を行ったことをもって完了したものとします。
          </li>
          <li className={styles.list}>
            前項に定める登録の完了時に、サービス利用契約が登録ユーザーと当方の間に成立し、登録ユーザーは本サービスを本規約に従い利用することができるようになります。
          </li>
          <li className={styles.list}>
            当方は、登録申請者が、以下の各号のいずれかの事由に該当する場合は、登録及び再登録を拒否することがあり、またその理由について一切開示義務を負いません。
          </li>
          <ol className={`${styles.paragraph} ${styles.childOl}`}>
            <li className={`${styles.list} ${styles.childList}`}>
              当方に提供した登録事項の全部または一部につき虚偽、誤記または記載漏れがあった場合
            </li>
            <li className={`${styles.list} ${styles.childList}`}>
              未成年者、成年被後見人、被保佐人または被補助人のいずれかであり、法定代理人、後見人、保佐人または補助人の同意等を得ていなかった場合
            </li>
            <li className={`${styles.list} ${styles.childList}`}>
              反社会的勢力等（暴力団、暴力団員、右翼団体、反社会的勢力、その他これに準ずる者を意味します。以下同じ。）である、または資金提供その他を通じて反社会的勢力等の維持、運営もしくは経営に協力もしくは関与する等反社会的勢力等との何らかの交流もしくは関与を行っていると当方が判断した場合
            </li>
            <li className={`${styles.list} ${styles.childList}`}>
              過去当方との契約に違反した者またはその関係者であると当方が判断した場合
            </li>
            <li className={`${styles.list} ${styles.childList}`}>
              第8条に定める措置を受けたことがある場合
            </li>
            <li className={`${styles.list} ${styles.childList}`}>
              その他、登録を適当でないと当方が判断した場合
            </li>
          </ol>
        </ol>

        <h2 className={styles.heading}>第3条(登録事項の変更)</h2>
        <ol className={styles.paragraph}>
          <li className={styles.list}>
            登録ユーザーは、登録事項に変更があった場合、当方の定める方法により当該変更事項を遅滞なく当方に通知するものとします。
          </li>
        </ol>

        <h2 className={styles.heading}>
          第4条(パスワード及びユーザーIDの管理)
        </h2>
        <ol className={styles.paragraph}>
          <li className={styles.list}>
            登録ユーザーは、自己の責任において、本サービスに関するパスワード及びユーザーIDを適切に管理及び保管するものとし、これを第三者に利用させ、または貸与、譲渡、名義変更、売買等をしてはならないものとします。
          </li>
          <li className={styles.list}>
            パスワードまたはユーザーIDの管理不十分、使用上の過誤、第三者の使用等によって生じた損害に関する責任は登録ユーザーが負うものとします。
          </li>
        </ol>

        <h2 className={styles.heading}>第5条(料金及び支払方法)</h2>
        <ol className={styles.paragraph}>
          <li className={styles.list}>
            登録ユーザーは、本サービス利用の対価として、別途当方が定め、当方ウェブサイトに表示する利用料金を、当方が指定する支払方法により当方に支払うものとします。
          </li>
          <li className={styles.list}>
            登録ユーザーが利用料金の支払を遅滞した場合、登録ユーザーは年14.6%の割合による遅延損害金を当方に支払うものとします。
          </li>
        </ol>

        <h2 className={styles.heading}>第6条(禁止事項)</h2>
        <ol className={styles.paragraph}>
          <li className={styles.list}>
            登録ユーザーは、本サービスの利用にあたり、以下の各号のいずれかに該当する行為または該当すると当方が判断する行為をしてはなりません。
          </li>
          <ol className={`${styles.paragraph} ${styles.childOl}`}>
            <li className={`${styles.list} ${styles.childList}`}>
              法令に違反する行為または犯罪行為に関連する行為
            </li>
            <li className={`${styles.list} ${styles.childList}`}>
              当方、本サービスの他の利用者またはその他の第三者に対する詐欺または脅迫行為
            </li>
            <li className={`${styles.list} ${styles.childList}`}>
              公序良俗に反する行為
            </li>
            <li className={`${styles.list} ${styles.childList}`}>
              当方、本サービスの他の利用者またはその他の第三者の知的財産権、肖像権、プライバシーの権利、名誉、その他の権利または利益を侵害する行為
            </li>
            <li className={`${styles.list} ${styles.childList}`}>
              本サービスを通じ、以下に該当し、または該当すると当方が判断する情報を当方または本サービスの他の利用者に伝えること
            </li>
            <li className={`${styles.list} ${styles.childList}`}>
              過度に暴力的または残虐な表現を含む情報
            </li>
            <li className={`${styles.list} ${styles.childList}`}>
              コンピューター・ウィルスその他の有害なコンピューター・プログラムを含む情報
            </li>
            <li className={`${styles.list} ${styles.childList}`}>
              当方、本サービスの他の利用者またはその他の第三者の名誉または信用を毀損する表現を含む情報
            </li>
            <li className={`${styles.list} ${styles.childList}`}>
              過度にわいせつな表現を含む情報 差別を助長する表現を含む情報
            </li>
            <li className={`${styles.list} ${styles.childList}`}>
              自殺、自傷行為を助長する表現を含む情報
            </li>
            <li className={`${styles.list} ${styles.childList}`}>
              薬物の不適切な利用を助長する表現を含む情報
              反社会的な表現を含む情報
            </li>
            <li className={`${styles.list} ${styles.childList}`}>
              チェーンメール等の第三者への情報の拡散を求める情報
            </li>
            <li className={`${styles.list} ${styles.childList}`}>
              他人に不快感を与える表現を含む情報
            </li>
            <li className={`${styles.list} ${styles.childList}`}>
              本サービスのネットワークまたはシステム等に過度な負荷をかける行為
            </li>
            <li className={`${styles.list} ${styles.childList}`}>
              当方が提供するソフトウェアその他のシステムに対するリバースエンジニアリングその他の解析行為
            </li>
            <li className={`${styles.list} ${styles.childList}`}>
              本サービスの運営を妨害するおそれのある行為
            </li>
            <li className={`${styles.list} ${styles.childList}`}>
              当方のネットワークまたはシステム等への不正アクセス
            </li>
            <li className={`${styles.list} ${styles.childList}`}>
              第三者に成りすます行為
            </li>
            <li className={`${styles.list} ${styles.childList}`}>
              本サービスの他の利用者のIDまたはパスワードを利用する行為
            </li>
            <li className={`${styles.list} ${styles.childList}`}>
              当方が事前に許諾しない本サービス上での宣伝、広告、勧誘、または営業行為
            </li>
            <li className={`${styles.list} ${styles.childList}`}>
              本サービスの他の利用者の情報の収集
            </li>
            <li className={`${styles.list} ${styles.childList}`}>
              当方、本サービスの他の利用者またはその他の第三者に不利益、損害、不快感を与える行為
            </li>
            <li className={`${styles.list} ${styles.childList}`}>
              反社会的勢力等への利益供与
            </li>
            <li className={`${styles.list} ${styles.childList}`}>
              面識のない他ユーザーとの出会いを目的とした行為
            </li>
            <li className={`${styles.list} ${styles.childList}`}>
              前各号の行為を直接または間接に惹起し、または容易にする行為
            </li>
            <li className={`${styles.list} ${styles.childList}`}>
              前各号の行為を試みること その他、当方が不適切と判断する行為
            </li>
          </ol>
        </ol>

        <h2 className={styles.heading}>第7条(本サービスの停止等)</h2>
        <ol className={styles.paragraph}>
          <li className={styles.list}>
            当方は、以下のいずれかに該当する場合には、登録ユーザーに事前に通知することなく、本サービスの全部または一部の提供を停止または中断することができるものとします。
          </li>
          <li className={styles.list}>
            本サービスに係るコンピューター・システムの点検または保守作業を緊急に行う場合
          </li>
          <li className={styles.list}>
            コンピューター、通信回線等の障害、誤操作、過度なアクセスの集中、不正アクセス、ハッキング等により本サービスの運営ができなくなった場合
          </li>
          <li className={styles.list}>
            地震、落雷、火災、風水害、停電、天災地変などの不可抗力により本サービスの運営ができなくなった場合
          </li>
          <li className={styles.list}>
            その他、当方が停止または中断を必要と判断した場合
          </li>
        </ol>

        <h2 className={styles.heading}>第8条(登録抹消等)</h2>
        <ol className={styles.paragraph}>
          <li className={styles.list}>
            当方は、登録ユーザーが、以下の各号のいずれかの事由に該当する場合は、事前に通知または催告することなく、利用履歴を削除もしくは非表示にし、当該登録ユーザーについて本サービスの利用を一時的に停止し、または登録ユーザーとしての登録を抹消することができます。
            <ol className={`${styles.paragraph} ${styles.childOl}`}>
              <li className={`${styles.list} ${styles.childList}`}>
                本規約のいずれかの条項に違反した場合
              </li>
              <li className={`${styles.list} ${styles.childList}`}>
                登録事項に虚偽の事実があることが判明した場合
              </li>
              <li className={`${styles.list} ${styles.childList}`}>
                支払停止もしくは支払不能となり、または破産手続開始、民事再生手続開始、会社更生手続開始、特別清算開始若しくはこれらに類する手続の開始の申立てがあった場合
              </li>
              <li className={`${styles.list} ${styles.childList}`}>
                当方からの問い合わせその他の回答を求める連絡に対して30日間以上応答がない場合
              </li>
              <li className={`${styles.list} ${styles.childList}`}>
                第2条第4項各号に該当する場合
              </li>
              <li className={`${styles.list} ${styles.childList}`}>
                その他、当方が本サービスの利用または登録ユーザーとしての登録の継続を適当でないと判断した場合
              </li>
            </ol>
          </li>
          <li className={styles.list}>
            前項各号のいずれかの事由に該当した場合、登録ユーザーは、当方に対して負っている債務の一切について当然に期限の利益を失い、直ちに当方に対して全ての債務の支払を行わなければなりません。
          </li>
        </ol>

        <h2 className={styles.heading}>第9条(退会)</h2>
        <ol className={styles.paragraph}>
          <li className={styles.list}>
            登録ユーザーは、当方所定の手続の完了により、本サービスから退会し、自己の登録ユーザーとしての登録を抹消することができます。
          </li>
          <li className={styles.list}>
            退会にあたり、当方に対して負っている債務が有る場合は、登録ユーザーは、当方に対して負っている債務の一切について当然に期限の利益を失い、直ちに当方に対して全ての債務の支払を行わなければなりません。
          </li>
          <li className={styles.list}>
            退会後の利用者情報の取扱いについては、第13条の規定に従うものとします。
          </li>
        </ol>

        <h2 className={styles.heading}>第10条(本サービスの内容の変更、終了)</h2>
        <ol className={styles.paragraph}>
          <li className={styles.list}>
            当方は、当方の都合により、本サービスの内容を変更し、または提供を終了することができます。
          </li>
          <li className={styles.list}>
            当方が本サービスの提供を終了する場合、当方は登録ユーザーに事前に通知するものとします。
          </li>
        </ol>

        <h2 className={styles.heading}>第11条(保証の否認及び免責)</h2>
        <ol className={styles.paragraph}>
          <li className={styles.list}>
            当方は、本サービスが登録ユーザーの特定の目的に適合すること、期待する機能・商品的価値・正確性・有用性を有すること、登録ユーザーによる本サービスの利用が登録ユーザーに適用のある法令または業界団体の内部規則等に適合すること、継続的に利用できること、及び不具合が生じないことについて、明示又は黙示を問わず何ら保証するものではありません。
          </li>
          <li className={styles.list}>
            当方は、付随的損害、間接損害、特別損害、将来の損害及び逸失利益にかかる損害については、賠償する責任を負わないものとします。
          </li>
          <li className={styles.list}>
            本サービスまたは当方ウェブサイトに関連して登録ユーザーと他の登録ユーザーまたは第三者との間において生じた取引、連絡、紛争等については、登録ユーザーが自己の責任によって解決するものとします。
          </li>
        </ol>

        <h2 className={styles.heading}>第12条(秘密保持)</h2>
        <ol className={styles.paragraph}>
          <li className={styles.list}>
            登録ユーザーは、本サービスに関連して当方が登録ユーザーに対して秘密に取扱うことを求めて開示した非公知の情報について、当方の事前の書面による承諾がある場合を除き、秘密に取扱うものとします。
          </li>
        </ol>

        <h2 className={styles.heading}>第13条(利用者情報の取扱い)</h2>
        <ol className={styles.paragraph}>
          <li className={styles.list}>
            当方による登録ユーザーの利用者情報の取扱いについては、別途当方プライバシーポリシー（
            <Link href="/privacy">https://app.sabolearn.com/privacy</Link>
            ）の定めによるものとし、登録ユーザーはこのプライバシーポリシーに従って当方が登録ユーザーの利用者情報を取扱うことについて同意するものとします。
          </li>
          <li className={styles.list}>
            当方は、登録ユーザーが当方に提供した情報、データ等を、個人を特定できない形での統計的な情報として、当方の裁量で、利用及び公開することができるものとし、登録ユーザーはこれに異議を唱えないものとします。
          </li>
        </ol>

        <h2 className={styles.heading}>第14条(本規約等の変更)</h2>
        <ol className={styles.paragraph}>
          <li className={styles.list}>
            当方は、当方が必要と認めた場合は、本規約を変更できるものとします。本規約を変更する場合、変更後の本規約の施行時期及び内容を当方ウェブサイト上での掲示その他の適切な方法により周知し、または登録ユーザーに通知します。但し、法令上登録ユーザーの同意が必要となるような内容の変更の場合は、当方所定の方法で登録ユーザーの同意を得るものとします。
          </li>
        </ol>

        <h2 className={styles.heading}>第15条(連絡／通知)</h2>
        <ol className={styles.paragraph}>
          <li className={styles.list}>
            本サービスに関する問い合わせその他登録ユーザーから当方に対する連絡または通知、及び本規約の変更に関する通知その他当方から登録ユーザーに対する連絡または通知は、当方の定める方法で行うものとします。
          </li>
          <li className={styles.list}>
            当方が登録事項に含まれるメールアドレスその他の連絡先に連絡または通知を行った場合、登録ユーザーは当該連絡または通知を受領したものとみなします。
          </li>
        </ol>

        <h2 className={styles.heading}>
          第16条(サービス利用契約上の地位の譲渡等)
        </h2>
        <ol className={styles.paragraph}>
          <li className={styles.list}>
            登録ユーザーは、当方の書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務につき、第三者に対し、譲渡、移転、担保設定、その他の処分をすることはできません。
          </li>
          <li className={styles.list}>
            当方は本サービスにかかる事業を他社に譲渡した場合には、当該事業譲渡に伴い利用契約上の地位、本規約に基づく権利及び義務並びに登録ユーザーの登録事項その他の顧客情報を当該事業譲渡の譲受人に譲渡することができるものとし、登録ユーザーは、かかる譲渡につき本項において予め同意したものとします。なお、本項に定める事業譲渡には、通常の事業譲渡のみならず、会社分割その他事業が移転するあらゆる場合を含むものとします。
          </li>
        </ol>

        <h2 className={styles.heading}>第17条(分離可能性)</h2>
        <ol className={styles.paragraph}>
          <li className={styles.list}>
            本規約のいずれかの条項またはその一部が、消費者契約法その他の法令等により無効または執行不能と判断された場合であっても、本規約の残りの規定及び一部が無効または執行不能と判断された規定の残りの部分は、継続して完全に効力を有するものとします。
          </li>
        </ol>

        <h2 className={styles.heading}>第18条(準拠法及び管轄裁判所)</h2>
        <ol className={styles.paragraph}>
          <li className={styles.list}>
            本規約及びサービス利用契約の準拠法は日本法とします。
          </li>
          <li className={styles.list}>
            本規約またはサービス利用契約に起因し、または関連する一切の紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
          </li>
        </ol>
        <p>【2024年3月21日制定】</p>
      </main>
      <footer className={styles.footer}>
        <nav>
          <ul>
            <li><Link href="/terms">利用規約</Link></li>
            <li><Link href="/privacy">プライバシーポリシー</Link></li>
          </ul>
        </nav>
        <div>Copyright © SaboLearn. All Rights Reserved.</div>
      </footer>
    </div>
  );
}
