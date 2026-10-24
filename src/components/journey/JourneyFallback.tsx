export default function JourneyFallback() {
  return (
    <svg className="journey-fallback" viewBox="0 0 1200 720" aria-hidden="true">
      <defs>
        <linearGradient id="jf-stone" x1="0" y1="0" x2="0.8" y2="1">
          <stop stopColor="#FFF9EB" />
          <stop offset="1" stopColor="#E8D9BB" />
        </linearGradient>
        <linearGradient id="jf-glass" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#8DB5AD" />
          <stop offset="1" stopColor="#254D60" />
        </linearGradient>
        <symbol id="jf-arch" viewBox="0 0 48 96" preserveAspectRatio="none">
          <path
            d="M0 96V38C0 20 10 9 24 0c14 9 24 20 24 38v58Z"
            fill="#F6E8CA"
          />
          <path
            d="M6 96V39c0-14 7-24 18-32 11 8 18 18 18 32v57Z"
            fill="#0B4F3C"
          />
          <path
            d="M11 96V40c0-11 5-19 13-26 8 7 13 15 13 26v56Z"
            fill="#193F37"
          />
          <path
            d="M24 14c8 7 13 15 13 26v56h-6V42c0-10-2-18-7-28Z"
            fill="#102F2B"
          />
          <path
            d="M6 96V39c0-14 7-24 18-32 11 8 18 18 18 32v57M0 53h6m36 0h6M0 75h6m36 0h6"
            fill="none"
            stroke="#C9A24B"
            strokeWidth="1.3"
          />
          <path d="M6 94h36v2H6Z" fill="#C8AC76" />
        </symbol>
        <symbol id="jf-monitor-desk" viewBox="0 0 104 140">
          <path
            d="M17 108v24m32-24v18m-15-10v23"
            stroke="#67766A"
            strokeWidth="3"
          />
          <path d="m14 103 21-10 21 10-21 11Z" fill="#6C9280" />
          <path d="m14 85 21 10v19l-21-10Z" fill="#12275A" />
          <path
            d="M8 61v32m52-6v31m32-46v30"
            stroke="#A58E66"
            strokeWidth="3.5"
          />
          <path d="m1 56 38-18 60 29-38 18Z" fill="#F7EBD4" />
          <path d="m1 56 60 29v5L1 61Z" fill="#CDB78D" />
          <path d="m61 85 38-18v5L61 90Z" fill="#B69C70" />
          <path d="m51 49 5 3v16l-5-3Z" fill="#12275A" />
          <path d="m29 9 47 23v30L29 39Z" fill="#12275A" />
          <path d="m34 17 37 18v19L34 36Z" fill="url(#jf-glass)" />
          <path d="m18 62 13-6 29 14-13 6Z" fill="#708B83" />
        </symbol>
        <symbol id="jf-student" viewBox="0 0 64 100">
          <path d="m15 63 10 6 1 20-6 5-6-6-5-16Z" fill="#233B54" />
          <path d="m21 62 15-1 11 10 4 12-8 4-10-12-15-1Z" fill="#34566D" />
          <path
            d="m14 88 7 2 5 6-6 3-9-5Zm29-6 7-2 9 6-5 4-11-3Z"
            fill="#12275A"
          />
          <path d="m21 23 8 1v11l-10 1Z" fill="#BE916F" />
          <path d="m15 30 14-1 11 9-3 25-20 4-9-13V39Z" fill="currentColor" />
          <path d="m33 34 9 13h13l3 7-20 2-11-13Z" fill="currentColor" />
          <path d="m53 47 7 1 1 5-6 1Z" fill="#D4AD88" />
          <path d="m16 10 10-4 7 8-3 10-10 4-7-8Z" fill="#D4AD88" />
          <path d="m14 11 10-7 9 6 1 6-17 1Z" fill="#EEE2C9" />
        </symbol>
        <symbol id="jf-planter" viewBox="0 0 70 106">
          <path d="m11 64 25-12 26 13-6 28-20 11-19-10Z" fill="#C6A578" />
          <path d="m36 77 26-12-6 28-20 11Z" fill="#AC865F" />
          <path d="m11 64 25-12 26 13-26 13Z" fill="#F1DFC0" />
          <path d="m17 64 19-8 19 9-19 9Z" fill="#67715A" />
          <path
            d="M36 66V23m0 34L18 38m18 11 19-20"
            fill="none"
            stroke="#456D4B"
            strokeWidth="2"
          />
          <path d="M35 45C13 44 6 29 9 20c17 1 28 9 26 25Z" fill="#6D9875" />
          <path d="M36 35C23 24 26 8 35 2c11 10 13 23 1 33Z" fill="#0B4F3C" />
          <path d="M38 49c-2-21 11-33 25-31 0 15-10 27-25 31Z" fill="#99AF77" />
          <path d="M35 63C15 62 10 52 12 44c14-1 25 5 23 19Z" fill="#0B4F3C" />
        </symbol>
      </defs>
      <g strokeLinejoin="round" strokeLinecap="round">
        <ellipse
          cx="607"
          cy="641"
          rx="407"
          ry="49"
          fill="#0B4F3C"
          opacity="0.07"
        />
        <path d="m82 410 514 250v17L82 427Z" fill="#D1BD98" />
        <path d="m596 660 536-260v17L596 677Z" fill="#B8AB8D" />
        <path
          d="m82 410 536-260 514 250-536 260Z"
          fill="url(#jf-stone)"
          stroke="#F8EEDB"
          strokeWidth="2"
        />
        <path d="m498 218 82-40 74 36-82 40Z" fill="#D3DCBD" />
        <path d="M581 216v-69" stroke="#857451" strokeWidth="5" />
        <path d="m580 103-21 49 4 40 18 17 18-23-2-37Z" fill="#0B4F3C" />
        <path d="m580 103 1 106 18-23-2-37Z" fill="#35694D" />
        <path d="m716 436 179-87 145 70-180 87Z" fill="#FFF3D5" />
        <path
          d="m869 458 143-69m-110 85 143-69m-156-38 102 49m-67-66 102 50"
          fill="none"
          stroke="#DECAA0"
          strokeWidth="1.2"
        />
        <path d="m895 349 145 70v9l-180 87v-9l173-84Z" fill="#CCB78B" />
        <path
          d="M895 349v-34l145 70v34M943 372v-34m48 57v-34M1040 385l-180 87v34m36-17v-34m36 16v-34m36 17v-34m36 16v-34"
          fill="none"
          stroke="#B9A570"
          strokeWidth="3"
        />
        <path d="m139 397 168-82 216 105-168 82Z" fill="#E7D4AE" />
        <path d="m169 397 138-67 186 90-138 67Z" fill="#F8ECD1" />
        <path
          d="m208 397 99-48 147 71-99 48Z"
          fill="none"
          stroke="#C9A24B"
          strokeWidth="1.5"
          opacity="0.6"
        />
        <path d="m139 259 168-82v138l-168 82Z" fill="#C9AA79" />
        <path d="m307 177 216 105v138L307 315Z" fill="#DDBF8F" />
        <use
          href="#jf-arch"
          width="44"
          height="126"
          transform="matrix(1 -.488 0 1 157 262)"
        />
        <use
          href="#jf-arch"
          width="44"
          height="126"
          transform="matrix(1 -.488 0 1 220 231)"
        />
        <use
          href="#jf-arch"
          width="44"
          height="126"
          transform="matrix(1 .486 0 1 324 197)"
        />
        <use
          href="#jf-arch"
          width="44"
          height="126"
          transform="matrix(1 .486 0 1 388 228)"
        />
        <use
          href="#jf-arch"
          width="44"
          height="126"
          transform="matrix(1 .486 0 1 452 259)"
        />
        <path d="m132 251 175-85 223 108-7 8-216-105-168 82Z" fill="#F4E3C1" />
        <path d="m132 251 7 8v9l168-82 216 105v-9L307 177Z" fill="#B6945E" />
        <path d="m283 389 51-25 51 25v10l-51 25-51-25Z" fill="#BDA375" />
        <path d="m283 389 51-25 51 25-51 25Z" fill="#F7E8C9" />
        <path d="m294 389 40-19 40 19-40 19Z" fill="#77A9A2" />
        <path
          d="M334 389v-24m-13 21 13 7 14-7"
          fill="none"
          stroke="#F6F0D8"
          strokeWidth="2"
        />
        <path d="m329 365 5-3 6 3-6 3Z" fill="#C9A24B" />
        <path d="m218 413 137 67v22l-137-67Z" fill="#C5A575" />
        <path d="m212 410 143 69 7-4-143-69Z" fill="#F6E7C9" />
        <path d="m139 281 79 38v116l-79-38Z" fill="#D9B985" />
        <use
          href="#jf-arch"
          width="51"
          height="106"
          transform="matrix(1 .486 0 1 153 298)"
        />
        <path d="m132 275 41-20 86 42-41 20Z" fill="#EEDDAD" />
        <path
          d="m132 275 86 42v9l-86-42Zm86 42 41-20v9l-41 20Z"
          fill="#B89760"
        />
        <path
          d="m155 405 48 23-15 8-48-23Zm-15 8 48 23v6l-48-23Zm-7 9 48 23-15 8-48-23Z"
          fill="#E4CFA8"
        />
        <path d="m118 430 48 23v5l-48-23Z" fill="#C7AC7C" />
        <path d="m355 492 248-120 256 124-248 120Z" fill="#E9E7CD" />
        <path d="m355 492 256 124v11L355 503Z" fill="#B6B99A" />
        <path d="m611 616 248-120v11L611 627Z" fill="#9CA98E" />
        <path d="m392 493 211-102 219 106-211 102Z" fill="#F6EED9" />
        <path d="m507 258 96-46v160l-96 47Z" fill="#6F9380" />
        <path d="m603 212 256 124v160L603 372Z" fill="#AEC0A3" />
        <path
          d="m603 357 256 124v15L603 372Zm-96 47 96-47v15l-96 47Z"
          fill="#7B9A81"
        />
        <path d="m521 280 68-33v103l-68 33Z" fill="#0B4F3C" />
        <path d="m526 285 58-28v89l-58 28Z" fill="url(#jf-glass)" />
        <path
          d="M555 272v87m-27-31 54-26"
          fill="none"
          stroke="#CAD8BE"
          strokeWidth="3"
        />
        <path d="M576 327v11" stroke="#C9A24B" strokeWidth="3" />
        <path d="m621 253 145 71v61l-145-71Z" fill="#0B4F3C" />
        <path d="m627 262 133 65v49l-133-65Z" fill="url(#jf-glass)" />
        <path
          d="M670 283v49m44-28v49m-87-64 133 65"
          fill="none"
          stroke="#DAE3CD"
          strokeWidth="3"
        />
        <path d="m787 333 55 27v124l-55-27Z" fill="#0B4F3C" />
        <path d="m793 343 43 21v111l-43-21Z" fill="url(#jf-glass)" />
        <path
          d="M814 354v110m-18-64 37 18m-4 6v11"
          fill="none"
          stroke="#DCE2C8"
          strokeWidth="2"
        />
        <path d="m500 250 103-50 264 128-8 8-256-124-96 46Z" fill="#DDE4CA" />
        <path d="m603 212 256 124v8L603 220l-96 47v-9Z" fill="#537963" />
        <path d="m406 449 76-37 28 14-76 37Z" fill="#D7C39A" />
        <path
          d="m406 449 28 14v29l-28-14Zm28 14 76-37v29l-76 37Z"
          fill="#A0AF91"
        />
        <path
          d="m417 442 5-2v-15l-5 2Zm8-4 6-3v-20l-6 3Zm9-4 5-2v-17l-5 2Zm9-4 6-3v-23l-6 3Z"
          fill="#12275A"
        />
        <path d="m426 417 5-2m12-5 6-3" stroke="#C9A24B" strokeWidth="2" />
        <g transform="translate(584 421) scale(.78)">
          <use href="#jf-monitor-desk" y="-96" width="104" height="140" />
          <use
            href="#jf-student"
            x="8"
            y="-48"
            width="54"
            height="84"
            color="#0B4F3C"
          />
        </g>
        <g transform="translate(690 472) scale(.78)">
          <use href="#jf-monitor-desk" y="-96" width="104" height="140" />
          <use
            href="#jf-student"
            x="8"
            y="-48"
            width="54"
            height="84"
            color="#8C7350"
          />
        </g>
        <g transform="translate(610 511) scale(.78)">
          <use href="#jf-monitor-desk" y="-96" width="104" height="140" />
          <use
            href="#jf-student"
            x="8"
            y="-48"
            width="54"
            height="84"
            color="#12275A"
          />
        </g>
        <path
          d="M413 494v36m74-3v37m53-66v36m-77-60v34"
          stroke="#7D886B"
          strokeWidth="4"
        />
        <path d="m405 486 60-29 83 40-60 29Z" fill="#D9B775" />
        <path d="m410 485 55-26 78 38-55 26Z" fill="#ECD6A3" />
        <path
          d="m405 486 83 40v6l-83-40Zm83 40 60-29v6l-60 29Z"
          fill="#B89B61"
        />
        <path d="m433 483 27-13 30 15-27 13Z" fill="#FFF9EA" />
        <path d="m467 504 24-12 22 11-24 12Z" fill="#FFF9EA" />
        <path d="m482 477 15-7 17 8-15 8Z" fill="#0B4F3C" />
        <path d="m487 476 9-4 12 6-9 4Z" fill="#82AAA0" />
        <path
          d="m424 529 22-11 22 11-22 10Zm72 5 22-11 22 11-22 10Z"
          fill="#6B8C78"
        />
        <path
          d="M430 535v19m30-19v19M502 540v18m30-18v18"
          stroke="#7A8164"
          strokeWidth="3"
        />
        <use
          href="#jf-student"
          x="423"
          y="480"
          width="45"
          height="70"
          color="#0B4F3C"
        />
        <use
          href="#jf-student"
          x="495"
          y="484"
          width="45"
          height="70"
          color="#A78346"
        />
        <path d="M936 288v94m85-53v94" stroke="#9E8D62" strokeWidth="4" />
        <path
          d="M900 416v22m41-1v22m29-37v23"
          stroke="#A18C5F"
          strokeWidth="3"
        />
        <path d="m891 411 38-18 49 24-38 18Z" fill="#E5CC92" />
        <path
          d="m891 411 49 24v5l-49-24Zm49 24 38-18v5l-38 18Z"
          fill="#BEA272"
        />
        <path
          d="m889 431 44 21-10 5-44-21Zm73-35 44 21-10 5-44-21Z"
          fill="#A9B894"
        />
        <path
          d="M884 440v13m39 5v13m35-63v14m39 5v12"
          stroke="#9D9B75"
          strokeWidth="3"
        />
        <use href="#jf-planter" x="888" y="312" width="45" height="68" />
        <use href="#jf-planter" x="944" y="322" width="49" height="74" />
        <use href="#jf-planter" x="1003" y="342" width="48" height="73" />
        <path
          d="m870 320 66-32 85 41-66 32Zm14-7 85 41m-71-48 85 41m-71-48 85 41m-71-48 85 41"
          fill="none"
          stroke="#D6C28D"
          strokeWidth="5"
        />
        <path d="M870 323v91m85-51v92" stroke="#B8A16A" strokeWidth="4" />
        <path d="m871 322 83 40" stroke="#FFF8E6" strokeWidth="2" />
        <use href="#jf-planter" x="816" y="467" width="45" height="68" />
        <use href="#jf-planter" x="365" y="405" width="40" height="61" />
      </g>
    </svg>
  );
}
