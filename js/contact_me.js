$(function () {
  $("input,textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function ($form, event, errors) {},
    submitSuccess: function ($form, event) {
      event.preventDefault();

      var name = $("input#name").val();
      var email = $("input#email").val();
      var message = $("textarea#message").val();

      var messageTemplate = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <div
         style="
         background-color: rgb(229, 231, 235);
         height: 100vh;
         padding-top: 2.5rem;
         "
         >
         <table
            align="center"
            width="100%"
            data-id="__react-email-container"
            role="presentation"
            cellspacing="0"
            cellpadding="0"
            border="0"
            style="
            max-width: 54em;
            background-color: rgb(255, 255, 255);
            padding: 1.5rem;
            "
            >
            <tbody>
               <tr style="width: 100%">
                  <td>
                     <p
                        data-id="react-email-text"
                        style="
                        font-size: 1.25rem;
                        line-height: 1.75rem;
                        margin: 16px 0;
                        color: rgb(31, 41, 55);
                        "
                        >
                        Please see below details.<br /><br />
                     </p>
                     <p
                        data-id="react-email-text"
                        style="
                        font-size: 14px;
                        line-height: 24px;
                        margin: 16px 0;
                        color: rgb(24, 64, 103);
                        font-weight: 700;
                        "
                        >
                        Name: {name}<br />Email: {email}<br />Message: <br />{message}
                     </p>
                     <p
                        data-id="react-email-text"
                        style="
                        font-size: 14px;
                        line-height: 14px;
                        margin: 16px 0;
                        color: rgb(31, 41, 55);
                        "
                        >
                        <br />Thank you!<br />
                     </p>
                  </td>
               </tr>
            </tbody>
         </table>
      </div> 
      `;

      $.ajax({
        url: "https://rjxpukwrxttedwhlommomgh5h40zmqbl.lambda-url.ap-southeast-1.on.aws",
        type: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          to: ["silvadrian3@gmail.com"],
          fromName: "Adrian Silva",
          fromEmail: "sbtest.adrianqs@gmail.com",
          subject: "Hi, Adrian!",
          body: messageTemplate
            .replace("{name}", name)
            .replace("{email}", email)
            .replace("{message}", message),
        }),
        cache: false,
        success: function () {
          $("#success").html("<div class='alert alert-success'>");
          $("#success > .alert-success")
            .html(
              "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
            )
            .append("</button>");
          $("#success > .alert-success").append(
            "<strong>Your message has been sent. </strong>"
          );
          $("#success > .alert-success").append("</div>");

          $("#contactForm").trigger("reset");
        },
        error: function () {
          $("#success").html("<div class='alert alert-danger'>");
          $("#success > .alert-danger")
            .html(
              "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
            )
            .append("</button>");
          $("#success > .alert-danger").append(
            "<strong>Sorry, it seems that my mail server is not responding. Please try again later."
          );
          $("#success > .alert-danger").append("</div>");

          $("#contactForm").trigger("reset");
        },
      });
    },
    filter: function () {
      return $(this).is(":visible");
    },
  });

  $('a[data-toggle="tab"]').click(function (e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

$("#name").focus(function () {
  $("#success").html("");
});
