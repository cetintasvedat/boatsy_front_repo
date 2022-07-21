const routeList = [

  {
    path: '/cms',
    name: 'CmsDashboard',
    component: () => import('./../../pages/cms/Dashboard.vue'),
    meta: { requiresAuth: true, authorize: [3] },
  },
  {
    path: '/cms/boats/admin-show-boat-:boatId',
    name: 'CmsBoatDetail',
    component: () => import('./../../pages/cms/boatDetailPage/CmsBoatDetail.vue'),
    meta: { requiresAuth: true, authorize: [3] },
  },
  {
    path: '/boat/edit',
    name: 'boatAddOrEdit',
    component: () => import('./../../pages/boatAddOrEdit/boatAddOrEdit.vue'),
    meta: { requiresAuth: true, authorize: [3] },
  },
  {
    path: '/cms/captain/list',
    name: 'captainList',
    component: () => import('./../../pages/cms/captainList/captainList.vue'),

    meta: { requiresAuth: true, authorize: [3] },
  },

  {
    path: '/cms/boat/list',
    name: 'CmsboatList',
    component: () => import('./../../pages/cms/captainList/boatList.vue'),

    meta: { requiresAuth: true, authorize: [3] },
  },
  {
    path: '/cms/bookings',
    name: 'CmsBookings',
    component: () => import('./../../pages/cms/bookings/CmsBookings.vue'),
    meta: { requiresAuth: true, authorize: [3] },
  },

  {
    path: '/',
    name: 'HomePage',
    component: () => import('./../../pages/homePage/Home.vue'),
    meta: {
      requiresAuth: false,
      authorize: ['IS_AUTHENTICATED_ANONYMOUSLY'],
      title: 'Boatsy: Tekne Kiralama, Yat Kiralama, Mavi Yolculuk',
      metaTags: [
        {
          type: 'name',
          name: 'description',
          content: 'Türkiyenin tekne kiralama platformu Boatsy',
        },
        {
          type: 'name',
          name: 'keywords',
          content: 'tekne kiralama',
        },
        {
          type: 'property',
          name: 'og:description',
          content: 'Tekne kiralama uygulaması Boatsyi hemen indirin',
        },
      ],
    },
  },
  {
    path: '/boat/owner/help',
    name: 'boatownerhelp',
    component: () => import('./../../pages/boatownerHelp/BoatOwnerHelp.vue'),
    meta: {
      requiresAuth: false,
      authorize: ['IS_AUTHENTICATED_ANONYMOUSLY'],
      title: 'Teknenizi kiraya verin - Boatsy',
      metaTags: [
        {
          type: 'name',
          name: 'description',
          content:
            'Teknenizi kiralamak mı istiyorsunuz? Tüm sorularınızı bu sayfada yanıtladık - Boatsy Captain',
        },
        {
          type: 'name',
          name: 'keywords',
          content: 'teknenizi kiralayın',
        },
        {
          type: 'property',
          name: 'og:description',
          content:
            'Teknenizi Boatsy Captain ile kolayca kiraya verin, güvenle ödeme alın ve hemen kazanmaya başlayın.',
        },
      ],
    },
  },
  {
    path: '/guest/help',
    name: 'guesthelp',
    component: () => import('./../../pages/guestHelp/GuestHelp.vue'),
    meta: {
      requiresAuth: false,
      authorize: ['IS_AUTHENTICATED_ANONYMOUSLY'],
      title: 'Tekne kiralama hakkında - Boatsy',
      metaTags: [
        {
          type: 'name',
          name: 'description',
          content:
            'Tekne kiralama ile ilgili tüm sorularınızın cevapları burada - Boatsy',
        },
        {
          type: 'name',
          name: 'keywords',
          content: 'boatsy tekne kiralama',
        },
        {
          type: 'property',
          name: 'og:description',
          content:
            'Tekne kiralama, yat kiralama, gulet kiralama, katamaran veya yelkenli kiralama ile ilgili sorularınızın cevabı.',
        },
      ],
    },
  },
  {
    path: '/how/boatsy/works',
    name: 'howboatsyworks',
    component: () => import('./../../pages/howboatsyworks/HowBoatsyWorks.vue'),
    meta: {
      requiresAuth: false,
      authorize: ['IS_AUTHENTICATED_ANONYMOUSLY'],
      title: ' Tekne kiralama hakkında her şey - Boatsy',
      metaTags: [
        {
          type: 'name',
          name: 'description',
          content:
            'Tekne, motoryat, gulet, katamaran veya yelkenli kiralama süreçleri hakkında tüm bilgiler burada. - Boatsy',
        },
        {
          type: 'name',
          name: 'keywords',
          content: 'tekne kiralama',
        },
        {
          type: 'property',
          name: 'og:description',
          content:
            'Yüzlerce seçenek arasından sana uygun tekneyi bul, rezervasyon talebi gönder, bağlantı kur ve tekne tatilin hazır.',
        },
      ],
    },
  },
  {
    path: '/trust/security',
    name: 'trustsecurity',
    component: () => import('./../../pages/security/SecurityPage.vue'),
    meta: {
      requiresAuth: false,
      authorize: ['IS_AUTHENTICATED_ANONYMOUSLY'],
      title: 'Güven ve Güvenlik - Boatsy',
      metaTags: [
        {
          type: 'name',
          name: 'description',
          content:
            'Risk analizi, belge doğrulaması ve güvenli ödeme. Boatsy ile tekne tatili her zaman güvende.',
        },
        {
          type: 'name',
          name: 'keywords',
          content: 'boatsy güvenlik',
        },
        {
          type: 'property',
          name: 'og:description',
          content:
            'Tekne tatilinde güvende hissetmek herkesin hakkı. Teknede tatiliniz Boatsy ile Güvende.',
        },
      ],
    },
  },
  {
    path: '/help/home',
    name: 'helphome',
    component: () => import('./../../pages/helpHome/HelpHome.vue'),
    meta: {
      requiresAuth: false,
      authorize: ['IS_AUTHENTICATED_ANONYMOUSLY'],
      title: 'Tekne kiralama ile ilgili tüm sorularınız için - Boatsy',
      metaTags: [
        {
          type: 'name',
          name: 'description',
          content:
            'Tekne kiralamak veya teknenizi kiraya vermek mi istiyorsunuz? - Boatsy nedir?',
        },
        {
          type: 'name',
          name: 'keywords',
          content: 'tekne kiralama',
        },
        {
          type: 'property',
          name: 'og:description',
          content:
            "Boatsy'nin ayrıcalıklarından yararlanarak tekne kiralayabilir veya teknenizi kolayca kiraya verebilirsiniz.",
        },
      ],
    },
  },
  {
    path: '/host/boats',
    name: 'hostboats',
    component: () => import('./../../pages/hostBoats/HostBoats.vue'),
    meta: {
      requiresAuth: false,
      authorize: ['IS_AUTHENTICATED_ANONYMOUSLY'],
      title: 'Tekneni kirala - Boatsy Captain',
      metaTags: [
        {
          type: 'name',
          name: 'description',
          content:
            'Teknenizi kiraya vermek Boatsy Captain ile parmaklarınızın ucunda. - Boatsy Captain',
        },
        {
          type: 'name',
          name: 'keywords',
          content: 'tekneni kirala',
        },
        {
          type: 'property',
          name: 'og:description',
          content:
            "Boatsy Captain ile tekneni kirala, Boatsy'nin ayrıcalıklı dünyasının avantajlarını hemen yakala.",
        },
      ],
    },
  },
  {
    path: '/sss',
    name: 'Sss',
    component: () => import('./../../pages/sss/Sss.vue'),
    meta: { requiresAuth: false, authorize: ['IS_AUTHENTICATED_ANONYMOUSLY'] },
  },
  {
    path: '/support',
    name: 'Support',
    component: () => import('./../../pages/support/Support.vue'),
    meta: { requiresAuth: false, authorize: ['IS_AUTHENTICATED_ANONYMOUSLY'] },
  },
  {
    path: '/privacypolicy',
    name: 'PrivacyPolicy',
    component: () => import('./../../pages/privacyPolicy/PrivacyPolicy.vue'),
    meta: {
      requiresAuth: false,
      authorize: ['IS_AUTHENTICATED_ANONYMOUSLY'],

      title: 'KVKK ve Aydınlatma Metni - Boatsy',
      metaTags: [
        {
          type: 'name',
          name: 'description',
          content:
            'Kişisel Verilerin Korunması Kanunu Uyarınca, tüm kişisel bilgileriniz Boatsy ile güvencede. ',
        },
        {
          type: 'name',
          name: 'keywords',
          content: 'boatsy kvkk',
        },
        {
          type: 'property',
          name: 'og:description',
          content:
            'Aydınlatma Metni ve KVKK kapsamında tüm yasal haklarınız ile ilgili detaylı bilgilere ulaşabilirsiniz.',
        },
      ],
    },
  },
  {
    path: '/termsofuse',
    name: 'TermsOfUse',
    component: () => import('./../../pages/termsOfUse/TermsOfUse.vue'),
    meta: { requiresAuth: false, authorize: ['IS_AUTHENTICATED_ANONYMOUSLY'] },
  },
  {
    path: '/sss/captain',
    name: 'SssCaptain',
    component: () => import('./../../pages/sss/SssCaptain.vue'),
    meta: { requiresAuth: false, authorize: ['IS_AUTHENTICATED_ANONYMOUSLY'] },
  },
  {
    path: '/sss/user',
    name: 'SssUser',
    component: () => import('./../../pages/sss/SssUser.vue'),
    meta: { requiresAuth: false, authorize: ['IS_AUTHENTICATED_ANONYMOUSLY'] },
  },
  {
    path: '/cancellationpolicy',
    name: 'CancellationPolicy',
    component: () =>
      import('./../../pages/cancellationPolicy/CancellationPolicy.vue'),
    meta: { requiresAuth: false, authorize: ['IS_AUTHENTICATED_ANONYMOUSLY'] },
  },
  {
    path: '/salescontract',
    name: 'SalesContract',
    component: () => import('./../../pages/salesContract/SalesContract.vue'),
    meta: { requiresAuth: false, authorize: ['IS_AUTHENTICATED_ANONYMOUSLY'] },
  },
  {
    path: '/forgetpassword',
    name: 'ForgetPassword',
    component: () => import('./../../pages/forgetpassword/ForgetPassword.vue'),
    meta: {
      requiresAuth: false,
      authorize: ['IS_AUTHENTICATED_ANONYMOUSLY'],
      title: 'Şifrenizi Hemen Değiştirin - Boatsy',
      metaTags: [
        {
          type: 'name',
          name: 'description',
          content:
            'Şifrenizi Değiştirin ve Boatsy ile tekne kiralamaya kaldığınız yerden devam edin.',
        },
        {
          type: 'name',
          name: 'keywords',
          content: 'şifre boatsy',
        },
        {
          type: 'property',
          name: 'og:description',
          content:
            'Şifrenizi mi unuttunuz? E-posta adresinizi veya telefon numaranızı kullanarak yeni bir şifre alabilirsiniz.',
        },
      ],
    },
  },
  {
    path: '/forgetpasswordsuccess',
    name: 'ForgetPasswordSuccess',
    component: () =>
      import('./../../pages/forgetpassword/ForgetPasswordSuccess.vue'),
    meta: {
      requiresAuth: false,
      authorize: ['IS_AUTHENTICATED_ANONYMOUSLY'],
      title: 'Şifre Sıfırlama - Boatsy',
      metaTags: [
        {
          type: 'name',
          name: 'description',
          content: 'Şifre Değiştirme Talebiniz Başarıyla Alındı.',
        },
        {
          type: 'name',
          name: 'keywords',
          content: 'şifre sıfırlama',
        },
        {
          type: 'property',
          name: 'og:description',
          content: 'Lütfen E-Posta Hesabınızı Kontrol Edin.',
        },
      ],
    },
  },
  {
    path: '/forgetpassworderror',
    name: 'ForgetPasswordError',
    component: () =>
      import('./../../pages/forgetpassword/ForgetPasswordError.vue'),
    meta: {
      requiresAuth: false,
      authorize: ['IS_AUTHENTICATED_ANONYMOUSLY'],
      title: 'Şifre Sıfırlama - Boatsy',
      metaTags: [
        {
          type: 'name',
          name: 'description',
          content: 'Şifre Değiştirme Talebiniz Alınamadı.',
        },
        {
          type: 'name',
          name: 'keywords',
          content: 'Lütfen E-Posta Adresinizin Doğruluğunu Kontrol Edin.',
        },
        {
          type: 'property',
          name: 'og:description',
          content: 'şifre değiştirme',
        },
      ],
    },
  },
  {
    path: '/boats/type/:boatType',
    name: 'AllBoats',
    component: () => import('./../../pages/allBoats/AllBoats.vue'),
    meta: {
      requiresAuth: false,
      authorize: ['IS_AUTHENTICATED_ANONYMOUSLY'],
      title: 'Teknede Tatil, Yat Kiralama, Gulet Kiralama - Boatsy',
      metaTags: [
        {
          type: 'name',
          name: 'description',
          content: 'Boatsy ile tekne kiralamak çok kolay',
        },
        {
          type: 'name',
          name: 'keywords',
          content: 'teknede tatil',
        },
        {
          type: 'property',
          name: 'og:description',
          content:
            'Boatsy ile mavi yolculuk bu yaz tatilinde vazgeçilmez olacak',
        },
      ],
    },
  },
  {
    path:
      '/mapboats/:boatCountry?-:boatState?-:boatCity?-:boatType/:startDate,:endDate/:personCapacity',
    name: 'MapBoats',
    component: () => import('./../../pages/boatMapPage/BoatMapPage.vue'),
    meta: {
      requiresAuth: false,
      authorize: ['IS_AUTHENTICATED_ANONYMOUSLY'],
      title: 'Mavi Tur, Yacht Charter, Mavi Yolculuk Turları - Boatsy ',
      metaTags: [
        {
          type: 'name',
          name: 'description',
          content:
            'Boatsy ile yat, gulet, katamaran, motoryat, yelkenli kirala',
        },
        {
          type: 'name',
          name: 'keywords',
          content: 'mavi tur',
        },
        {
          type: 'property',
          name: 'og:description',
          content:
            'Boatsy ile en uygun tekne kiralama fiyatlarını karşılaştırın.',
        },
      ],
    },
  },
  {
    path: '/mapboats/:boatState-:boatCity',
    name: 'MapBoatsLocation',
    component: () => import('./../../pages/boatMapPage/BoatMapPage.vue'),
    meta: {
      requiresAuth: false,
      authorize: ['IS_AUTHENTICATED_ANONYMOUSLY'],
      title: 'Bodrum Tekne Kiralama, Fethiye Tekne Kiralama - Boatsy ',
      metaTags: [
        {
          type: 'name',
          name: 'description',
          content:
            'Göcek tekne kiralama, Bodrum Yat Kiralama, Marmaris Yat Kiralama için Boatsy. ',
        },
        {
          type: 'name',
          name: 'keywords',
          content: 'bodrum tekne kiralama',
        },
        {
          type: 'property',
          name: 'og:description',
          content: 'Boatsy ile Göcek koylarında mavi tura çıkın.',
        },
      ],
    },
  },
  {
    path: '/mapboats/:boatState',
    name: 'MapBoatsOnlyState',
    component: () => import('./../../pages/boatMapPage/BoatMapPage.vue'),
    meta: {
      requiresAuth: false,
      authorize: ['IS_AUTHENTICATED_ANONYMOUSLY'],
      title: 'Bodrum Tekne Kiralama, Fethiye Tekne Kiralama - Boatsy ',
      metaTags: [
        {
          type: 'name',
          name: 'description',
          content:
            'Göcek tekne kiralama, Bodrum Yat Kiralama, Marmaris Yat Kiralama için Boatsy. ',
        },
        {
          type: 'name',
          name: 'keywords',
          content: 'bodrum tekne kiralama',
        },
        {
          type: 'property',
          name: 'og:description',
          content: 'Boatsy ile Göcek koylarında mavi tura çıkın.',
        },
      ],
    },
  },
  {
    path: '/mapboats/country/:boatCountry',
    name: 'MapBoatsOnlyCountry',
    component: () => import('./../../pages/boatMapPage/BoatMapPage.vue'),
    meta: {
      requiresAuth: false,
      authorize: ['IS_AUTHENTICATED_ANONYMOUSLY'],
      title: 'Bodrum Tekne Kiralama, Fethiye Tekne Kiralama - Boatsy ',
      metaTags: [
        {
          type: 'name',
          name: 'description',
          content:
            'Göcek tekne kiralama, Bodrum Yat Kiralama, Marmaris Yat Kiralama için Boatsy. ',
        },
        {
          type: 'name',
          name: 'keywords',
          content: 'bodrum tekne kiralama',
        },
        {
          type: 'property',
          name: 'og:description',
          content: 'Boatsy ile Göcek koylarında mavi tura çıkın.',
        },
      ],
    },
  },
  {
    path: '/mapboats/:boatType',
    name: 'MapBoatsGroupByBoatType',
    component: () => import('./../../pages/boatMapPage/BoatMapPage.vue'),
    meta: {
      requiresAuth: false,
      authorize: ['IS_AUTHENTICATED_ANONYMOUSLY'],
      title: 'Katamaran, Gulet Kiralama, Motoryat Kiralama - Boatsy ',
      metaTags: [
        {
          type: 'name',
          name: 'description',
          content:
            'Katamaran & Yelkenli Kiralama, Gulet, Motor Yat Kiralama için Boatsy.',
        },
        {
          type: 'name',
          name: 'keywords',
          content: 'gulet kiralama',
        },
        {
          type: 'property',
          name: 'og:description',
          content:
            'Bodrum yat kiralama, Bozburun tekne kiralama ve kaptansız tekne kiralama - Boatsy.',
        },
      ],
    },
  },
  {
    path: '/boats/:boatType-:boatState-:boatCity-:boatId',
    name: 'BoatDetail',
    component: () => import('./../../pages/boatDetail/boatDetail.vue'),
    meta: {
      requiresAuth: false,
      authorize: ['IS_AUTHENTICATED_ANONYMOUSLY'],
      title: 'Tekne Kiralama, Gulet Kiralama, Yat Kiralama - Boatsy ',
      metaTags: [
        {
          type: 'name',
          name: 'description',
          content: 'Aradığınız tekneyi kiralamak Boatsy ile çok kolay.',
        },
        {
          type: 'name',
          name: 'keywords',
          content: 'yat kiralama',
        },
        {
          type: 'property',
          name: 'og:description',
          content:
            'Bu yaz teknede tatil planla, Boatsy ile hemen tekne kirala.',
        },
      ],
    },
  },
  {
    path: '/boats/detail/:boatType-:boatState-:boatCity-:boatId-:startDate&:endDate',
    name: 'WithDateBoatDetail',
    component: () => import('./../../pages/boatDetail/boatDetail.vue'),
    meta: {
      requiresAuth: false,
      authorize: ['IS_AUTHENTICATED_ANONYMOUSLY'],
      title: 'Tekne Kiralama, Gulet Kiralama, Yat Kiralama - Boatsy ',
      metaTags: [
        {
          type: 'name',
          name: 'description',
          content: 'Aradığınız tekneyi kiralamak Boatsy ile çok kolay.',
        },
        {
          type: 'name',
          name: 'keywords',
          content: 'yat kiralama',
        },
        {
          type: 'property',
          name: 'og:description',
          content:
            'Bu yaz teknede tatil planla, Boatsy ile hemen tekne kirala.',
        },
      ],
    },
  },
  {
    path: '/captainprofile/:userId',
    name: 'CaptainProfile',
    component: () => import('./../../pages/captainProfile/captainProfile.vue'),
    meta: {
      requiresAuth: false,
      authorize: ['IS_AUTHENTICATED_ANONYMOUSLY'],
      title: 'Kaptanlı Tekne Kiralama, Kaptansız Tekne Kiralama - Boatsy ',
      metaTags: [
        {
          type: 'name',
          name: 'description',
          content: 'Konaklamalı ve haftalık tekne kiralama için Boatsy.',
        },
        {
          type: 'name',
          name: 'keywords',
          content: 'kaptanlı tekne kiralama',
        },
        {
          type: 'property',
          name: 'og:description',
          content:
            'Boatsy ile Kaptanlı veya kaptansız, günlük veya haftalık tekne kirala.',
        },
      ],
    },
  },
  {
    path:
      '/payment/success/:bookingId-:reservasionId-:amount-:currency-:mail-:phone-:userName-:userLastname-:boatType',
    name: 'PaymentSuccess',
    component: () => import('./../../pages/payment/PaymentSuccess.vue'),
    meta: {
      requiresAuth: false,
      title: 'Güvenle Ödeme Yapın - Boatsy ',
      metaTags: [
        {
          type: 'name',
          name: 'description',
          content:
            'Tekne tatiliniz hayal olmasın. Bu yaz Boatsy ile teknede tatil planlayın, hemen seçin, güvenle ödeyin.',
        },
        {
          type: 'name',
          name: 'keywords',
          content: 'tekne tatili boatsy',
        },
        {
          type: 'property',
          name: 'og:description',
          content:
            "Boatsy'nin güvenli ödeme yöntemi sayesinde bilgileriniz güvende. Hemen tekne kirala. - Boatsy",
        },
      ],
    },
  },
  {
    path: '/payment/public/:bookingId-:reservasionId',
    name: 'PublicPayment',
    component: () => import('./../../pages/payment/PublicPayment.vue'),
    meta: {
      requiresAuth: false,
      title: 'Güvenle Ödeme Yapın - Boatsy ',
      metaTags: [
        {
          type: 'name',
          name: 'description',
          content:
            'Tekne tatiliniz hayal olmasın. Bu yaz Boatsy ile teknede tatil planlayın, hemen seçin, güvenle ödeyin.',
        },
        {
          type: 'name',
          name: 'keywords',
          content: 'tekne tatili boatsy',
        },
        {
          type: 'property',
          name: 'og:description',
          content:
            "Boatsy'nin güvenli ödeme yöntemi sayesinde bilgileriniz güvende. Hemen tekne kirala. - Boatsy",
        },
      ],
    },
  },
  {
    path: '/account-settings',
    name: 'AccountSettings',
    component: () => import('./../../pages/accountPage/Account.vue'),
    meta: {
      requiresAuth: true,
      authorize: [1, 2, 3],
      title: 'Benim için - Boatsy ',
      metaTags: [
        {
          type: 'name',
          name: 'description',
          content: 'Sizin için Boatsy - Boatsy ile Tekne Tatili Hayal Değil',
        },
        {
          type: 'name',
          name: 'keywords',
          content: 'tekne tatili',
        },
        {
          type: 'property',
          name: 'og:description',
          content:
            'Profilini tamamla, bilgileri gir, kolayca tekne kirala - Boatsy',
        },
      ],
    },
  },
  {
    path: '/account-settings/personal-info',
    name: 'PersonalInfo',
    component: () => import('./../../pages/personalInfo/PersonalInfo.vue'),
    meta: {
      requiresAuth: true,
      authorize: [1, 2, 3],
      title: 'Sizin için - Boatsy',
      metaTags: [
        {
          type: 'name',
          name: 'description',
          content: "Sizden ilham aldık Boatsy'i sizin için tasarladık.",
        },
        {
          type: 'name',
          name: 'keywords',
          content: 'boatsy',
        },
        {
          type: 'property',
          name: 'og:description',
          content:
            "Boatsy'de bir yeriniz olsun ister misiniz? Profil bilgilerinizi hemen girin.",
        },
      ],
    },
  },
  {
    path: '/account-settings/login-and-security',
    name: 'LoginAndSecurity',
    component: () =>
      import('./../../pages/loginAndSecurity/LoginAndSecurity.vue'),
    meta: {
      requiresAuth: true,
      authorize: [1, 2, 3],
      title: 'Giriş ve Güvenlik - Boatsy',
      metaTags: [
        {
          type: 'name',
          name: 'description',
          content:
            'Boatsy şifrenizi kolayca değiştirin güvenle seyahat edin. Tüm bilgileriniz emin ellerde.',
        },
        {
          type: 'name',
          name: 'keywords',
          content: 'boatsy',
        },
        {
          type: 'property',
          name: 'og:description',
          content:
            'Boatsy ile kişisel bilgileriniz güvende. Tekne tatili mi? - Boatsy',
        },
      ],
    },
  },
  {
    path: '/my-bookings',
    name: 'UserBookings',
    component: () => import('./../../pages/userBookings/UserBookings.vue'),
    meta: {
      requiresAuth: true,
      authorize: [1, 2, 3],
      title: 'Kiralık Tekne, Kiralık Motoryat, Özel Yat Kiralama - Boatsy',
      metaTags: [
        {
          type: 'name',
          name: 'description',
          content:
            'Boatsy ile Tekne Tatili Rezervasyonu parmaklarınızın ucunda - Boatsy',
        },
        {
          type: 'name',
          name: 'keywords',
          content: 'kiralık motoryat',
        },
        {
          type: 'property',
          name: 'og:description',
          content: 'Mavi Tur, Teknede tatil ve rezervasyon - Boatsy',
        },
      ],
    },
  },
  {
    path: '/notifications',
    name: 'UserNotifications',
    component: () =>
      import('./../../pages/userNotifications/UserNotifications.vue'),
    meta: {
      requiresAuth: true,
      authorize: [1, 2, 3],
      title: 'Teknede Tatil, Mavi Yolculuk - Boatsy',
      metaTags: [
        {
          type: 'name',
          name: 'description',
          content:
            'Yat tatili, mavi tur ve gulet kiralama. Kısaca her şey için Boatsy',
        },
        {
          type: 'name',
          name: 'keywords',
          content: 'mavi yolculuk',
        },
        {
          type: 'property',
          name: 'og:description',
          content: 'Konaklamalı yat kiralama, katamaran ya da gulet - Boatsy',
        },
      ],
    },
  },
  {
    path: '/book-confirm/:boatId/:startDate,:endDate',
    name: 'UserBookConfirm',
    component: () =>
      import('./../../pages/reservationConfirm/ReservationConfirm.vue'),
    meta: {
      title: 'Hemen Tekne Rezerve Edin - Boatsy',
      metaTags: [
        {
          type: 'name',
          name: 'description',
          content:
            'Dilediğiniz tekneyi hemen rezerve edin, Boatsy ile benzersiz bir tekne tatili deneyimi yaşayın.',
        },
        {
          type: 'name',
          name: 'keywords',
          content: 'tekne boatsy',
        },
        {
          type: 'property',
          name: 'og:description',
          content:
            'Boatsy ile dilediğiniz tekneyi bulmak çok kolay. Hemen seç, güvenle öde, mavi yolculuk keyfini yaşa.',
        },
      ],
    },
  },
  {
    path: '/my-bookings/:bookId',
    name: 'BookingDetail',
    component: () => import('./../../pages/bookingDetail/BookingDetail.vue'),
    meta: {
      requiresAuth: true,
      authorize: [1, 2, 3],
      title: 'Tekne Tatili Rezervasyonu - Boatsy',
      metaTags: [
        {
          type: 'name',
          name: 'description',
          content:
            'Teknede tatil Boatsy ile bir başka. Tekne kiralama rezervasyonlarınızı görüntüleyin.',
        },
        {
          type: 'name',
          name: 'keywords',
          content: 'tekne tatili',
        },
        {
          type: 'property',
          name: 'og:description',
          content: 'Tekne tatilinizle ilgili tüm rezervasyon detayları burada.',
        },
      ],
    },
  },
  {
    path: '/notification/setting',
    name: 'NotificationSetting',
    component: () =>
      import('./../../pages/notificationSetting/NotificationSetting.vue'),
    meta: {
      requiresAuth: true,
      authorize: [1, 2, 3],
      title: 'Size haberimiz var - Boatsy',
      metaTags: [
        {
          type: 'name',
          name: 'description',
          content:
            'Tekne tatiliniz ile ilgili tüm gelişmelere hemen ulaşın. Teknede tatil fırsatını kaçırmayın.',
        },
        {
          type: 'name',
          name: 'keywords',
          content: 'boatsy',
        },
        {
          type: 'property',
          name: 'og:description',
          content:
            'Boatsy hesabınıza gelen bildirimler ve tekne tatiliniz ile ilgili tüm detaylar burada.',
        },
      ],
    },
  },
  {
    path: '/liked/boat',
    name: 'LikedBoat',
    component: () => import('./../../pages/likedBoat/LikedBoat.vue'),
    meta: {
      requiresAuth: true,
      authorize: [1, 2, 3],
      title: 'Gulet, Katamaran, Motoryat veya Yelkenli - Boatsy',
      metaTags: [
        {
          type: 'name',
          name: 'description',
          content:
            'Gulet, Motoryat, Yelkenli veya Katamaran Kirala. Tüm Tekneler parmaklarının ucunda - Boatsy',
        },
        {
          type: 'name',
          name: 'keywords',
          content: 'katamaran',
        },
        {
          type: 'property',
          name: 'og:description',
          content: 'Göcek koyları bu yaz Boatsy ile bir başka olacak.',
        },
      ],
    },
  },

  {
    path: '/message',
    name: 'Message',
    component: () => import('./../../pages/message/Message.vue'),
    props: true,
    meta: {
      requiresAuth: true,
      authorize: [1, 2, 3],
      title: 'Kiralık Tekne, Gulet ve daha fazlası için Boatsy',
      metaTags: [
        {
          type: 'name',
          name: 'description',
          content: 'Kiralık Yatlar, Gulet Charter ve Yat Turları - Boatsy',
        },
        {
          type: 'name',
          name: 'keywords',
          content: 'kiralık tekne',
        },
        {
          type: 'property',
          name: 'og:description',
          content: "Gulet kiralama ve mavi tur için en iyi yatlar Boatsy'de.",
        },
      ],
    },
  },
  {
    path: '/book-confirm/success/:bookingId',
    name: 'BookingSuccess',
    component: () => import('./../../pages/bookingSuccess/BookingSuccess.vue'),
    meta: {
      requiresAuth: true,
      authorize: [1, 2, 3],
      title: 'Rezervasyon Talebi Gönderildi - Boatsy',
      metaTags: [
        {
          type: 'name',
          name: 'description',
          content:
            'Teknede tatile bir adım daha yaklaştınız. Rezervasyon talebiniz başarı ile gönderildi. - Boatsy',
        },
        {
          type: 'name',
          name: 'keywords',
          content: 'rezervasyon boatsy',
        },
        {
          type: 'property',
          name: 'og:description',
          content:
            'Boatsy ile tüm tekne kiralama ayrıcalıklarından faydalanın. Hemen ödeyin, tekne tatilinin keyfine varın.',
        },
      ],
    },
  },
  {
    path: '/userProfile/:userId',
    name: 'UserProfile',
    component: () => import('./../../pages/userProfile/userProfile.vue'),
    meta: { requiresAuth: false, authorize: ['IS_AUTHENTICATED_ANONYMOUSLY'] },
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: () => import('./../../pages/blog/allBlog/allBlog.vue'),
    meta: {
      title: 'Blog - Boatsy',
      metaTags: [
        {
          type: 'name',
          name: 'description',
          content: 'Bilmeniz gereken tekne kuralları. - Boatsy',
        },
        {
          type: 'name',
          name: 'keywords',
          content: 'boatsy blog',
        },
      ],
    },
  },
  {
    path: '/blogs/ilk-kez-tekne-tatiline-cikacaklara-tavsiyeler',
    name: 'Content1',
    component: () => import('./../../pages/blog/blogDetail/content_1.vue'),
    meta: {
      title: 'İlk Kez Tekne Tatiline Çıkacaklara Tavsiyeler - Boatsy',
      metaTags: [
        {
          type: 'name',
          name: 'description',
          content: 'Bilmeniz gereken tekne kuralları. - Boatsy',
        },
        {
          type: 'name',
          name: 'keywords',
          content: 'rezervasyon boatsy',
        },
      ],
    },
  },
  {
    path: '/blogs/baharda-boatsy-ile-tekne-kirala',
    name: 'Content2',
    component: () => import('./../../pages/blog/blogDetail/content_2.vue'),
    meta: {
      title: 'Baharda Boatsy ile Tekne Kirala, Yaz Tatilin Erken Başlasın!',
      metaTags: [
        {
          type: 'name',
          name: 'description',
          content: 'Baharda Boatsy ile Tekne Kirala. - Boatsy',
        },
        {
          type: 'name',
          name: 'keywords',
          content: 'tekne kirala boatsy',
        },
      ],
    },
  },
  {
    path: '/blogs/tekne-tatiline-hazirlanirken-yapmaniz-gerekenler',
    name: 'Content3',
    component: () => import('./../../pages/blog/blogDetail/content_3.vue'),
    meta: {
      title: 'Tekne Tatiline Hazırlanırken Yapmanız Gerekenler',
      metaTags: [
        {
          type: 'name',
          name: 'description',
          content: 'Yapmanız Gerekenler. - Boatsy',
        },
        {
          type: 'name',
          name: 'keywords',
          content: 'yapmanız gerekenler boatsy',
        },
      ],
    },
  },
  {
    path: '/blogs/tekne-kiralamanin-satin-almaktan-daha-iyi-olmasi',
    name: 'Content4',
    component: () => import('./../../pages/blog/blogDetail/content_4.vue'),
    meta: {
      title: 'Tekne Kiralamanın Satın Almaktan Daha İyi Olmasının 6 Sebebi',
      metaTags: [
        {
          type: 'name',
          name: 'description',
          content: 'Tekne Kiralama Satın Almaktan Daha İyi. - Boatsy',
        },
        {
          type: 'name',
          name: 'keywords',
          content: 'tekne kirala boatsy',
        },
      ],
    },
  },
  {
    path: '/blogs/tekne-kiralamadan-once-bilmeniz-gereken-ipuclari',
    name: 'Content5',
    component: () => import('./../../pages/blog/blogDetail/content_5.vue'),
    meta: {
      title:
        'Tekne Kiralamadan Önce Bilmeniz Gereken İpuçları – Başlangıç Seviye Mavi Yolculuk',
      metaTags: [
        {
          type: 'name',
          name: 'description',
          content: 'Başlangıç Seviye Mavi Yolculuk. - Boatsy',
        },
        {
          type: 'name',
          name: 'keywords',
          content: 'tekne kirala ipucu boatsy',
        },
      ],
    },
  },
  {
    path: '/blogs/teknenizi-kiraya-vermek-icin-hazirliklar',
    name: 'Content6',
    component: () => import('./../../pages/blog/blogDetail/content_6.vue'),
    meta: {
      title: 'Teknenizi Kiraya Vermek için Hazırlıklar',
      metaTags: [
        {
          type: 'name',
          name: 'description',
          content: 'Teknenizi Kiraya Vermek için Hazırlıklar. - Boatsy',
        },
        {
          type: 'name',
          name: 'keywords',
          content: 'tekne kirala hazırlık boatsy',
        },
      ],
    },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('./../../pages/about/About.vue'),
    meta: {
      title: "Boatsy'i yakından tanıyın - Boatsy",
      metaTags: [
        {
          type: 'name',
          name: 'description',
          content: "Boatsy'i yakından tanıyın - Boatsy",
        },
        {
          type: 'name',
          name: 'keywords',
          content: 'boatsy hakkında',
        },
      ],
    },
  },
  {
    path: '/cms',
    name: 'CmsDashboard',
    component: () => import('./../../pages/cms/Dashboard.vue'),
    meta: { requiresAuth: true, authorize: [3] },
  },
  {
    path: '/cms/bookings/:id/:reservationCode',
    name: 'CmsBookingDetail',
    component: () => import('./../../pages/cms/bookingDetailPage/CmsBookingDetail.vue'),
    meta: { requiresAuth: true, authorize: [3] },
  }
]

export default routeList
