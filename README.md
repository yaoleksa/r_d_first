<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description
Оскільки не вказувалось на якій мові повинна бути документація, я використаю українську. Моя англійська за останній час постраждала. І так, в моєму проекті я реалізував всі вимоги на мінімальному рівні + добавив ще один модуль `me`, але його я добавив просто як приклад, скоріше для себе, щоб розібратися як NetsJS працює.
Проект виконаний, в основному, по офіційні документації, тому нічого оригінального в ньому немає. [Посилання на документацію](https://docs.nestjs.com/).
Єдина стороння бібліотека, яку я використав, це `cross-env`. Її я використав для налаштування трьох середовищ:
+ `dev`
+ `local`
+ `prod`

Різниця в запуску кожного із середовищ полягає в наступному:
 - коли запускається режим `prod`, `cross-env` не створює змінної середовища `NODE_ENV` 
 - коли запускається режим `local`, `cross-env` визначає змінну `NODE_ENV` рівну `local`
 - коли запускається режим `dev`, `cross-env` визначає змінну `NODE_ENV` рівну `dev`
 
 На основі змінної середовища `NODE_ENV` визначається шлях до файлу `.env`. В конфігурації є три файли зі змінними середовища відповідно. Додатково при запуску `dev` середовища у файлі `.env.dev` визначено змінну `HOST`, що визначає хост на якому запускається сервер.
 В проекті реалізовано модуль `Users`. Модуль обробляє чотири `HTTP` запити
 + `GET` - повертає список всіх користувачів
 + `GET` `/[user_name]` - повертає користувача за ім'ям
 + `POST` - створює нового користувача
 + `DELETE` `/[user_name]` - видаляє користувача з відповідним ім'ям
 Для зберігання користувачів сервер використовує масив. Валідація вхідних даних не реалізована.

 # Чому я обрав code-first
 Тому що мені зручніше працювати з TypeScript і декораторами ніж .graphql. З цим підходом простіше рефакторити, все зберігається з одним синтаксисом. Це банально простіше

 # Мій hot query

 Для таблиці `Orders` створено два індекси - `idx_order_user_createdAt` додано через декоратор `@Index` і `idx_orders_user_created_at_desc` додано через міграцію.
 В папці `sql` є `SQL` запит який я використовую для перевірки чи індекс існує і чи планер справді його використовує. Мушу зазначити, що планер не завжди самостійно використовує індекс, інколи потрібно вручну вимикати `SET enable_seqscan = off;` щоб планер почав використовувати індекс. Наскільки я розумію це відбувається тому, що моя таблиця не велика, а для малих таблиць не доцільно використовувати індекс. Очікується, що при збільшенні розмірів таблиці планер почне використовувати індекс самостійно, зараз він це робить не на постійні основі.
 Отож, оскільки в мене була маленька таблиця planner по замовчуванню використовував Seq Scan, щоб цього уникнути я створив велику кількість `Order` і planner почав використовувати `Index`. Іншими словами все працює як і очікувалось. 
 Якщо порівняти роботу планера з індексом і без (`explain-analyze-before` та `explain-analyze-after`). Видно, що з індексом planner працює швидше. Різниця в часі не значна, але, очікується, що при зростанні розміру таблиці вона буде збільшуватись


[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash

# watch mode
$ npm run start:dev

# local mode
$ npm run start:local

# production mode
$ npm run start
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
