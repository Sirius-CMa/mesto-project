


// : Токен: 639adf4e-3336-4963-8d2d-dff255a402e3
// : Идентификатор группы: plus-cohort-20





function aa() {
  new Promise(function (resolve, reject) {
    fetch('https://nomoreparties.co/v1/plus-cohort-20/cards', {
      headers: {
        authorization: '639adf4e-3336-4963-8d2d-dff255a402e3'
      }
    })
      .then(res => res.json())
      .then((result) => {
        console.log(result);
        result.forEach(item => {
          // console.log(item.name)
          // console.log(item.link)
          console.log(item)

        });


      });
  })
}

//aa()


