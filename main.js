$(document).ready(function () {
  // Gọi API và hiển thị dữ liệu
  $.ajax({
    url: "./db.json",
    method: "GET",
    dataType: "json",
    success: function (data) {
      const companies = data.companies || []; // Nếu "companies" không tồn tại, dùng mảng rỗng
      companies.forEach((company, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${company.name}</td>
                <td>${
                  company.address ||
                  '<p style="color: red; margin: 0">Không có thông tin</p>'
                }</td>
                  <td>${
                    company.region ||
                    '<p style="color: red; margin: 0">Không có thông tin</p>'
                  }</td>
                    <td>${
                      company.disadvantages ||
                      '<p style="color: red; margin: 0">Không có thông tin</p>'
                    }</td>
                      <td>${
                        company.advice ||
                        '<p style="color: red; margin: 0">Không có thông tin</p>'
                      }</td>
                        <td>${
                          company.advantages ||
                          '<p style="color: red; margin: 0">Không có thông tin</p>'
                        }</td>

            </tr>
        `;
        $("#company-table-body").append(row);
      });
    },
    error: function (xhr, status, error) {
      console.error("Lỗi khi gọi API:", error);
      alert("Không thể tải dữ liệu từ API.");
    },
  });

  // Hàm sắp xếp
  function sortTable(table, column, order) {
    const rows = $(table).find("tbody tr").get();

    rows.sort((a, b) => {
      const valA = $(a).children("td").eq(column).text().toUpperCase();
      const valB = $(b).children("td").eq(column).text().toUpperCase();

      if (valA < valB) return order === "asc" ? -1 : 1;
      if (valA > valB) return order === "asc" ? 1 : -1;
      return 0;
    });

    $.each(rows, function (index, row) {
      $(table).children("tbody").append(row);
    });
  }

  // Lắng nghe sự kiện click vào nút sort
  $(".sort-btn").on("click", function () {
    const column = $(this).data("column"); // Lấy cột cần sort
    const order = $(this).data("order"); // Lấy thứ tự hiện tại (asc hoặc desc)

    // Đổi thứ tự (toggle)
    const newOrder = order === "asc" ? "desc" : "asc";
    $(this).data("order", newOrder);

    // Sắp xếp bảng
    sortTable("table", column, newOrder);
  });
});
