window.onload = pageRedirect();

function pageRedirect(){
    const tabUrl = window.location.href;
    localStorage.setItem("tabURl",JSON.stringify(tabUrl));
}
const tableData = [];
$(document).ready(getBookmarks);

function getBookmarks(){
    chrome.bookmarks.search({},(Bookmarks)=>{
        Bookmarks.forEach(bookmark => {
            tableData.push(bookmark);
        });
        drawTable();
    });
    
}

function drawTable()
{   

    $('.tableBody').empty(); // Clear existing content
    const data = tableData;
    for (const item of data) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class=" sr">${data.indexOf(item) + 1}</td>
            <td class=" titles">${item.title}</td>
            <td class="text-center url_bookmark">${item.url && (item.url.startsWith("https://") || item.url.startsWith("http://")) ? 
         item.url.split("://")[1] : 
         item.url && item.url.startsWith("www.") ? 
         item.url.split("www.")[1] : 
         "Invalid URL"}</td>
            <td class="manage">
            <a class="openprojectbtn p-2 openUrl cursor-pointer"   data-interaction="${item.url}"><div class="tooltips"><img src="../images/edit-btn.png"><span class="tooltiptext"></span>
            </div></a>
            
           <a class="deleteBookmark cursor-pointer" data-interaction="${item.id}"><div class="tooltips"><img src="../images/delete-btn.png"><span class="tooltiptext"></span>
           </div></a>
          
            </td>
          `;
        $('.tableBody').append(row); // Append row to table
    }
}