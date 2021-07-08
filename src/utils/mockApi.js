function getCities() {
  return [
    {
      id: 1,
      text: 'İzmir'
    },
    {
      id: 2,
      text: 'Ankara'
    },
    {
      id: 3,
      text: 'İstanbul'
    }
  ];
}

function getDistricts(cityId) {
  if (cityId === '1') {
    return [
      {
        id: 1,
        text: 'Alsancak'
      },
      {
        id: 2,
        text: 'Bornova'
      },
      { id: 3, text: 'Gaziemir' }
    ];
  } else if (cityId === '2') {
    return [
      {
        id: 4,
        text: 'Keçiören'
      },
      {
        id: 5,
        text: 'Kızılay'
      },
      { id: 6, text: 'Dikmen' }
    ];
  } else if (cityId === '3') {
    return [
      {
        id: 7,
        text: 'Besiktas'
      },
      {
        id: 8,
        text: 'Bebek'
      },
      { id: 9, text: 'Levent' }
    ];
  }
}

function getInstallmentOptions(cardNo) {
  if (cardNo === '12345') {
    return [
      { id: 1, text: 'Peşin' },
      { id: 2, text: '2 Taksit' },
      { id: 3, text: '3 Taksit' },
      { id: 4, text: '4 Taksit' },
      { id: 5, text: '6 Taksit' }
    ];
  } else {
    return [
      { id: 1, text: 'Peşin' },
      { id: 2, text: '2 Taksit' }
    ];
  }
}

function getUser(userId) {
  if (userId === '8413') {
    return Promise.resolve({
      userId: '8413',
      name: 'Ferhat Özçöllü',
      tckn: 27742180258,
      address: 'address',
      paymentInfo: {
        ownerName: 'Ferhat Özçöllü',
        cardNo: '4242424242424241',
        cvv: '903',
        expiryYear: 2026,
        expiryMonth: 5
      }
    });
  }

  return Promise.reject('Kullanıcı bulunamadı');
}

export { getCities, getDistricts, getInstallmentOptions, getUser };
