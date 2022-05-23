//POST task from table
$(document).ready(function () {
  $("#submit").on("click", function () {
    $.post(
      "http://localhost:8008/api/items/save",
      {
        taskName: $("#taskName").val(),
        week: $("#week").val(),
        description: $("#description").val(),
      },
      function (data, succes) {
        showTable(data);
        resetData();
        showConfirmation();
        hideModal();
        location.reload();
      }
    );
  });
  $.get("http://localhost:8008/api/items/", {}, function (data, success) {
    showTable(data);
    resetData();
    getID(data);
    deleteID(data);
    hideModal();

    $(".table").on("click", "tr", function (event) {
      let itemID = $(this).attr("data-id");
      const nodeName = event.target.nodeName;
      if (nodeName === "BUTTON") {
        //alert($(event.target).data("btn") + "  is the btn id");
        //Do rest things
      }
      if (nodeName === "TD") {
        window.location.href = "/api/items/" + itemID;
      }
    });

    $("#myModal").on("show.bs.modal", function (event) {
      var button = $(event.relatedTarget); // Button that triggered the modal
      var btnID = button.data("btnid"); // Extract info from data-* attributes
      // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
      // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
      var modal = $(this);
      modal.find(".modal-body input#btnClickedID").val(btnID);
    });
  });

  function showConfirmation() {
    console.log("Am sa afisez toast!!!");
    $("#liveToast").toast("show");
  }

  function hideModal() {
    console.log("Ascund modal");
    $("#exampleModal").modal("hide");
    $(".modal-backdrop").remove();
  }

  function resetData() {
    console.log("am intrat sa te resetez");
    $("#taskName").val("");
    $("#week").val("");
    $("#description").val("");
  }
});

//END POST

function showTable(data) {
  $("#tBody").empty();
  data.forEach((item) => {
    //define
    let tbody = document.getElementById("tBody");
    let createTR = document.createElement("tr");
    let createTD = document.createElement("td");
    let createTD1 = document.createElement("td");
    let createTD2 = document.createElement("td");
    let createTD3 = document.createElement("td");
    let createTD4 = document.createElement("td");
    let createTD5 = document.createElement("td");
    let editButton = document.createElement("button");
    let deleteButton = document.createElement("button");
    let editIcon = document.createElement("i");
    let deleteIcon = document.createElement("i");
    //
    //class
    createTR.classList.add("table-row", "clickable");
    createTD.classList.add("col");
    //edit
    editButton.classList.add("btn", "btn-warning", "me-3", "show_on_hover");
    editIcon.classList.add("fa-solid", "fa-pen-to-square");
    //delete
    deleteButton.classList.add(
      "btn",
      "btn-danger",
      "me-3",
      "show_on_hover",
      "deletable"
    );
    deleteIcon.classList.add("fa-solid", "fa-trash");
    //
    //atribute
    setAttributes(editButton, {
      id: "editButton",
      type: "submit",
      "data-bs-target": "#editModal",
      "data-bs-toggle": "modal",
      "data-id": item._id,
    });
    setAttributes(createTR, {
      "data-id": item._id,
      "data-url": "api/items/" + item._id,
    });
    setAttributes(deleteButton, {
      "data-id": item._id,
    });
    //
    let itemID = document.createTextNode(item._id);
    let taskName = document.createTextNode(item.taskName);
    let week = document.createTextNode(item.week);
    let description = document.createTextNode(item.description);
    let status = document.createTextNode(item.status);
    //
    editButton.appendChild(editIcon);
    deleteButton.appendChild(deleteIcon);
    console.log(itemID);
    createTD.appendChild(itemID);
    createTD1.appendChild(taskName);
    createTD2.appendChild(week);
    createTD3.appendChild(description);
    createTD4.appendChild(status);
    createTD5.appendChild(editButton);
    createTD5.appendChild(deleteButton);
    //tr
    createTR.appendChild(createTD);
    createTR.appendChild(createTD1);
    createTR.appendChild(createTD2);
    createTR.appendChild(createTD3);
    createTR.appendChild(createTD4);
    createTR.appendChild(createTD5);
    tbody.appendChild(createTR);
    // );
  });
}

function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

function getID(data) {
  $(".clickable").click(function () {
    let itemID = $(this).attr("data-id");
    console.log("item ID: " + itemID);
    $("#submitEdit").on("click", function () {
      const taskName = $("#taskNameEdit").val();
      const week = $("#weekEdit").val();
      const description = $("#descriptionEdit").val();
      const status = $("#statusEdit").val();

      $.ajax({
        url: "/api/items/" + itemID,
        type: "PUT",
        data: {
          taskName: taskName,
          week: week,
          description: description,
          status: status,
        },
        success: function () {
          console.log("L-am trimis la baza de date");
          location.reload();
          //showTable(data);
        },
        fail: function () {
          console.log("n-am reusit");
        },
      });
    });
  });
}

function deleteID(data) {
  $(".deletable").on("click", function () {
    let itemID = $(this).attr("data-id");
    console.error("item ID: " + itemID);
    $.ajax({
      url: "/api/items/" + itemID,
      type: "DELETE",
      data: { action: "delete" },
      success: function () {
        console.log("am sters ceva de aici");
        $("#tBody").load("http://localhost:8008/api");
        //showTable(data);
      },
      fail: function () {
        console.log("n-am reusit");
      },
    });
  });
}
