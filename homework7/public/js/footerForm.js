const footerform = {
    methods: {
        sendData(){//проверить поля отправки
            const name = document.querySelector('#name');
            const mobile = document.querySelector('#mobile');
            const email = document.querySelector('#email');
            const nameError = document.querySelector('#nameError');
            const mobileError = document.querySelector('#mobileError');
            const emailError = document.querySelector('#emailError');

            //проверка имени: оно должно состоять из букв русского или английского алфавита
            const regestName = /[a-zA-Zа-яА-Я]/g;
            //проверка номера телефона: должен иметь вид +7(000)000-0000.
            const regestMobile = /^\+7\(\d{3}\)\d{3}-\d{4}$/;
            //проверка электронной почты: вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru
            const regestEmail = /^\w+[.-]?\w+@\w+\.[a-z]+$/;

            //проверка имени
            if (regestName.test(name.value)){
                name.style.border = "2px solid green";
            } else {
                name.style.border = "2px solid red";
                nameError.style.display = "block";
            }

            //проверка номера телефона
            if (regestMobile.test(mobile.value)){
                mobile.style.border = "2px solid green";
            } else {
                mobile.style.border = "2px solid red";
                mobileError.style.display = "block";
            }

            //проверка адреса электронной почты
            if (regestEmail.test(email.value)){
                email.style.border = "2px solid green";
            } else {
                email.style.border = "2px solid red";
                emailError.style.display = "block";
            }

            //если все поля ввода верны, вывести сообщение
            if (regestName.test(name.value) && regestMobile.test(mobile.value) && regestEmail.test(email.value)){
                alert('Ваши данные отправлены. Ожидайте ответа.')
            }
        }

    },
    template:`
            <form action="#" id="footer_form">
            <fieldset>Форма обратной связи
                <label for="name">
                    <input class= "formInput" type="text" placeholder="Имя" id="name">
                    <span id="nameError" class="error">Имя должно содержать только буквы</span>
                </label>
                <label for="mobile">
                    <input class= "formInput" type="text" placeholder="Телефон:+7(000)000-0000" id="mobile">
                    <span id="mobileError" class="error">Телефон должен иметь вид +7(000)000-0000.</span>
                </label>
                <label for="email">
                    <input class= "formInput" type="text" placeholder="email" id="email">
                    <span id="emailError" class="error">E-mail должен иметь вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.</span>
                </label>
                <label for="text">
                    <textarea name="text" id="text" cols="30" rows="10" placeholder="Текст сообщения"></textarea>
                </label>
                <button type="submit" id="submit" @click.prevent="sendData()">Отправить</button>
            </fieldset>
        </form>
    `
}
