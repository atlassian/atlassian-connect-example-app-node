
document.addEventListener("DOMContentLoaded", () => {
	const introPageContainer = document.getElementById("introductionPageContent");
	const introPageContent = introPageContainer.getAttribute("data-page-content")
	introPageContainer.innerHTML = introPageContent;
});
