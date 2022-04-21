
/*     var myarray = new Array();
          for(i=0;i<3;i++){
              console.log(myarray);
          } */
          console.log("hello");
          function myFunction() {
              // for(var c = 0 ; c <5; c++){console.log("hi"+ c)
              var x = document.getElementById("myDIV");
              var a = document.getElementById("myDIV2");
              var b = document.getElementById("myDIV3");
              var c = document.getElementById("myDIV4");
              var y = document.getElementById("job_type").innerHTML.trim();
              console.log("hi"+c)
              console.log(`hello:${y}:`)
              for(var i = 0 ;i<=arr.length;i++){}
              if ( arr[i] === "Subsidy Claim") {
                  x.style.display = "block";
                  console.log("if 1")
                  a.style.display = "none";
                  b.style.display = "none";
                  c.style.display = "none";
                  break;
              }
              else if (y === "State Govt") {
                  a.style.display = "block";
                  console.log("if 2")
                  x.style.display = "none";

                  b.style.display = "none";
                  c.style.display = "none";
              }
              else if (y === "Electric Duty") {
                  b.style.display = "block";
                  console.log("if 3")
                  x.style.display = "none";
                  a.style.display = "none";

                  c.style.display = "none";
              }
              else if (y === "Pre Scrutiny") {
                  c.style.display = "block";
                  console.log("if 4")
                  x.style.display = "none";
                  a.style.display = "none";
                  b.style.display = "none";

              }
              else {
                  x.style.display = "none";
                  a.style.display = "none";
                  b.style.display = "none";
                  c.style.display = "none";
                  console.log("else")
              }
          }
      