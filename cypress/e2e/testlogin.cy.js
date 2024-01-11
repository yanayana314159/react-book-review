context("Actions", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/signin");
  });

  // https://on.cypress.io/interacting-with-elements

  it(".type() - パスワードが間違えているとき", () => {
    // https://on.cypress.io/type
    cy.get(".email-input")
      .type("yana@gmail.com") // 無効な電子メール形式を入力
      .should("have.value", "yana@gmail.com");
    //.should("have.class", "error"); // エラークラスが設定されていることを確認
    cy.get(".password-input")
      .type("yanaA") // 無効なパスワード
      .should("have.value", "yanaA");
    cy.get(".signin-button").click();
    cy.on("window:alert", (t) => {
      //assertions
      expect(t).to.contains("メールアドレスかパスワードが間違っています。");
    });
  });
  it(".type() - 入力されていないとき", () => {
    // https://on.cypress.io/type
    cy.get(".signin-button").click();
    cy.on("window:alert", (t) => {
      //assertions
      expect(t).to.contains("メールアドレスとパスワードを入力してください。");
    });
  });
  it(".type() - メールアドレスとパスワードが正しいとき", () => {
    // https://on.cypress.io/type
    cy.get(".email-input")
      .type("yana@gmail.com") // 無効な電子メール形式を入力
      .should("have.value", "yana@gmail.com");
    //.should("have.class", "error"); // エラークラスが設定されていることを確認
    cy.get(".password-input")
      .type("yana") // 無効なパスワード
      .should("have.value", "yana");
    cy.get(".signin-button").click();
    cy.get("h2").should("contain", "ホーム");
  });
});
