///<reference types="cypress"/>

describe("validate the fastapi reuest", () => {
  it("TC_01 validate get request root ", () => {
    cy.request({
      method: "GET",
      url: "http://127.0.0.1:8000/",
    }).then(({ body, headers, status }) => {
      expect(status).to.eql(200);

      expect(body.message).contain("Fast API in Python");
      expect(headers).to.have.property("content-length", "32");
      expect(headers).to.have.property("content-type", "application/json");
      expect(headers).to.have.property("server", "uvicorn");
 
    });
  });

  
  it("TC_02 validate get user ", () => {
    cy.request({
      method: "GET",
      url: 'http://127.0.0.1:8000/user',

    }).then((res,headers) => {
    
     //assert users
    let body=res.body
   
   expect(body[0].id).to.eq(1)
   expect(body[0].name).to.eq("MÃ¡rcio")
   expect(body[0].mail).to.eq("example@mail.com")
   expect(body[0].phone).to.eq("98769878")

   expect(body[1].id).to.eq(2)
   expect(body[1].name).to.eq("Leandro")
   expect(body[1].mail).to.eq("example_leandro@mail.com")
   expect(body[1].phone).to.eq("94435676")
   
     expect(res.headers).to.have.property("content-length", "153");
     expect(res.headers).to.have.property("content-type", "application/json");
     expect(res.headers).to.have.property("server", "uvicorn");
     })
  });

  it("TC_03 validate get user and read question ", () => {
    cy.request({
      method: "GET",
      url: 'http://127.0.0.1:8000/question/1',

    }).then(({body,status,headers}) => {
      // cy.log(res)
     
      expect(status).to.eql(200);
      expect(body.question).to.eql('Which car model/category are you looking for?');
      expect(headers).to.have.property("content-length", "80");
      expect(headers).to.have.property("content-type", "application/json");
      expect(headers).to.have.property("server", "uvicorn");
      expect(body.question).contain("Which car model/category are you looking for?");
    });
  });


  it("TC_04 validate get user and read alternative ", () => {
    cy.request({
      method: "GET",
      url: 'http://127.0.0.1:8000/alternatives/1',

    }).then((res,) => {
      // expect(body[0].alternative).contain('compact')

    expect(res.body[0].alternative).to.eq('compact')
    expect(res.body[1].alternative).to.eq('utilitary')
    expect(res.body[2].alternative).to.eq('sporting')
    expect(res.body[3].alternative).to.eq('suv')

    expect(res.headers).to.have.property("content-length", "196");
    expect(res.headers).to.have.property("content-type", "application/json");
    expect(res.headers).to.have.property("server", "uvicorn");


    });
  });
  it("TC_05 validate get create answer ", () => {
    cy.request({
      method: "POST",
      url: 'http://127.0.0.1:8000/answer',
      failOnStatusCode: false,
      body:{
        "user_id": 0,
        "answers": [
          {
            "question_id": 0,
            "alternative_id": 0
          }
        ]
      }

    }).then((res) => {
      expect(res.body).contain("Internal Server Error")
      expect(res.status).to.eq(500)
      expect(res.statusText).contain("Internal Server Error")

    });
  });
  it("TC_06 validate get read result ", () => {
    cy.request({
      method: "GET",
      url: 'http://127.0.0.1:8000/result/1',
    }).then((res) => {
      res.body.forEach(element => {
        cy.log(element)
       
      });
      expect(res.headers).to.have.property("content-length", "279");
      expect(res.headers).to.have.property("content-type", "application/json");
      expect(res.headers).to.have.property("server", "uvicorn");

    });


  });

});
