'use client';

import PageContainer from '@/components/common/page-container';

export default function PrivacyPage() {
  const effectiveDate = '2026년 1월 12일';

  return (
    <PageContainer>
      <div className="prose mx-auto max-w-4xl bg-white px-8 pb-8 mb-8 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl dark:bg-gray-900 dark:ring-gray-800">
        {/* 헤더 */}
        <header className="border-b border-gray-200 pb-6 dark:border-gray-700">
          <h1>개인정보 처리방침</h1>
          <p>
            <strong>Blispace</strong>(이하 "회사"라 함)는 「개인정보 보호법」 제30조에 따라
            정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록
            하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.
          </p>
        </header>

        {/* 본문 */}
        <div className="space-y-10 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          {/* 제 1 조 */}
          <section>
            <h2>제 1 조 (개인정보의 처리 목적)</h2>
            <p>
              회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의
              목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 별도의 동의를 받는
              등 필요한 조치를 이행할 예정입니다.
            </p>
            <ol>
              <li>
                <strong>회원 가입 및 관리:</strong> 회원제 서비스 이용에 따른 본인확인, 개인식별,
                가입의사 확인, 불량회원의 부정 이용 방지, 민원처리, 고지사항 전달
              </li>
              <li>
                <strong>서비스 제공:</strong> 콘텐츠 제공, 맞춤형 서비스 제공, 본인인증, 콘텐츠 공유
                및 커뮤니티 기능 제공
              </li>
            </ol>
          </section>

          {/* 제 2 조 */}
          <section>
            <h2 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">
              제 2 조 (수집하는 개인정보의 항목 및 수집방법)
            </h2>
            <p>회사는 서비스 제공을 위해 필요한 최소한의 개인정보를 수집하고 있습니다.</p>

            <div className="space-y-3 pl-2">
              <div>
                <strong className="block text-gray-900 dark:text-gray-100">1. 일반 회원가입</strong>
                <ul>
                  <li>필수항목: 이메일, 비밀번호(암호화), 닉네임</li>
                </ul>
              </div>

              <div>
                <strong className="block text-gray-900 dark:text-gray-100">
                  2. 소셜 로그인(OAuth) 이용 시
                </strong>
                <ul>
                  <li>필수항목: 소셜 식별자(ID), 이메일, 닉네임, 프로필 사진</li>
                  <li>제공처: Google, Kakao, Naver 등</li>
                </ul>
              </div>

              <div>
                <strong className="block text-gray-900 dark:text-gray-100">
                  3. 서비스 이용 과정에서 자동 수집
                </strong>
                <ul>
                  <li>IP 주소, 쿠키, 서비스 이용 기록, 기기 정보(OS, 브라우저 정보 등)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 제 3 조 */}
          <section>
            <h2>제 3 조 (개인정보의 처리 및 보유기간)</h2>
            <ol>
              <li>
                <strong>회원 정보:</strong> 회원 탈퇴 시까지 보유하며, 탈퇴 요청 시 지체 없이
                파기합니다.
              </li>
              <li>
                <strong>관계 법령에 의한 보존:</strong> 법령에 따라 일정 기간 보관이 필요한 경우
                아래와 같이 보관합니다.
                <ul>
                  <li>계약/청약철회 기록: 5년 (전자상거래법)</li>
                  <li>대금결제/재화공급 기록: 5년 (전자상거래법)</li>
                  <li>소비자 불만/분쟁처리 기록: 3년 (전자상거래법)</li>
                  <li>로그기록(접속지 정보): 3개월 (통신비밀보호법)</li>
                </ul>
              </li>
            </ol>
          </section>

          {/* 제 4 조 */}
          <section>
            <h2>제 4 조 (개인정보의 제3자 제공)</h2>
            <p>
              회사는 정보주체의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 아래의
              경우에는 예외로 합니다.
            </p>
            <ul>
              <li>정보주체로부터 별도의 동의를 받은 경우</li>
              <li>법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우</li>
              <li>수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
            </ul>
          </section>

          {/* 제 5 조 */}
          <section>
            <h2>제 5 조 (개인정보처리의 위탁)</h2>
            <p>
              회사는 현재 개인정보 처리업무를 외부에 위탁하지 않고 있습니다. 향후 위탁 업무가 발생할
              경우, 위탁 대상자와 위탁 업무 내용을 본 처리방침을 통해 공개하고 필요한 경우 사전
              동의를 받겠습니다.
            </p>
          </section>

          {/* 제 6 조 */}
          <section>
            <h2>제 6 조 (개인정보의 파기절차 및 방법)</h2>
            <p>
              회사는 원칙적으로 개인정보 처리목적이 달성된 경우에는 지체없이 해당 개인정보를
              파기합니다.
            </p>
            <ul>
              <li>
                <strong>파기절차:</strong> 목적이 달성된 개인정보는 별도의 DB로 옮겨져(종이의 경우
                별도의 서류함) 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라(보유기간
                참조) 일정 기간 저장된 후 파기됩니다.
              </li>
              <li>
                <strong>파기방법:</strong> 전자적 파일 형태는 기록을 재생할 수 없는 기술적 방법을
                사용하여 삭제하며, 종이 문서는 분쇄하거나 소각하여 파기합니다.
              </li>
            </ul>
          </section>

          {/* 제 7 조 */}
          <section>
            <h2>제 7 조 (정보주체의 권리·의무 및 행사방법)</h2>
            <p>
              정보주체는 회사에 대해 언제든지 개인정보 열람, 정정, 삭제, 처리정지 요구 등의 권리를
              행사할 수 있습니다. 권리 행사는 서면, 전자우편 등을 통하여 하실 수 있으며, 회사는 이에
              대해 지체 없이 조치하겠습니다.
            </p>
          </section>

          {/* 제 8 조 */}
          <section>
            <h2>제 8 조 (개인정보의 안전성 확보조치)</h2>
            <ul>
              <li>
                <strong>비밀번호 암호화:</strong> 회원의 비밀번호는 일방향 암호화하여 저장 및
                관리됩니다.
              </li>
              <li>
                <strong>해킹 등에 대비한 대책:</strong> 보안프로그램 설치 및 주기적인 점검, 암호화
                통신(SSL) 등을 통해 개인정보를 안전하게 전송합니다.
              </li>
              <li>
                <strong>취급 직원의 최소화:</strong> 개인정보를 취급하는 직원을 최소한으로 제한하고
                있습니다.
              </li>
            </ul>
          </section>

          {/* 제 9 조 (중요 - 추가됨) */}
          <section>
            <h2>제 9 조 (개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항)</h2>
            <p>
              회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로
              불러오는 '쿠키(cookie)'를 사용합니다.
            </p>
            <ul>
              <li>
                <strong>쿠키의 사용목적:</strong> 이용자의 접속 빈도나 방문 시간, 이용 기록 등을
                분석하여 서비스 개선에 활용합니다.
              </li>
              <li>
                <strong>거부 방법:</strong> 웹브라우저 상단의 도구 &gt; 인터넷 옵션 &gt; 개인정보
                메뉴의 옵션 설정을 통해 쿠키 저장을 거부할 수 있습니다. 단, 쿠키 저장을 거부할 경우
                로그인이 필요한 일부 서비스 이용에 어려움이 있을 수 있습니다.
              </li>
            </ul>
          </section>

          {/* 제 10 조 */}
          <section>
            <h2>제 10 조 (개인정보 보호책임자)</h2>
            <p>
              회사는 개인정보 처리에 관한 업무를 총괄하고, 정보주체의 불만처리 및 피해구제를 위하여
              아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
            </p>
            <ul>
              <li>
                <strong>담당부서:</strong> Blispace 운영팀
              </li>
              <li>
                <strong>이메일:</strong> daily.blispace@gmail.com
              </li>
            </ul>
          </section>

          {/* 제 11 조 */}
          <section>
            <h2>제 11 조 (권익침해 구제방법)</h2>
            <p>
              정보주체는 아래의 기관에 대해 개인정보 침해에 대한 피해구제, 상담 등을 문의하실 수
              있습니다.
            </p>
            <ul>
              <li>개인정보 침해신고센터 (privacy.kisa.or.kr / 118)</li>
              <li>개인정보 분쟁조정위원회 (www.kopico.go.kr / 1833-6972)</li>
              <li>대검찰청 사이버수사과 (www.spo.go.kr / 1301)</li>
              <li>경찰청 사이버안전국 (cyberbureau.police.go.kr / 182)</li>
            </ul>
          </section>

          {/* 제 12 조 */}
          <section>
            <h2>제 12 조 (개인정보 처리방침의 변경)</h2>
            <p>
              이 개인정보 처리방침은 <strong>{effectiveDate}</strong>부터 적용됩니다. 법령 및 방침에
              따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터
              공지사항을 통하여 고지할 것입니다.
            </p>
          </section>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
          <p>
            공고일자: {effectiveDate} / 시행일자: {effectiveDate}
          </p>
          <p className="mt-2">문의: daily.blispace@gmail.com</p>
        </div>

        {/* 하단 버튼 */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => window.history.back()}
            className="rounded-lg bg-gray-900 px-8 py-3 text-sm font-semibold text-white shadow-md hover:bg-gray-800 transition-all dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            돌아가기
          </button>
        </div>
      </div>
    </PageContainer>
  );
}
