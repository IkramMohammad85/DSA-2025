document.addEventListener('DOMContentLoaded', function () {
    // Function to handle service tabs
    window.openService = function (event, serviceFocus) {
    event.stopPropagation();
    var i, servicetabcontent, servicetablinks;
    servicetabcontent = document.getElementsByClassName("servicetabcontent");
    for (i = 0; i < servicetabcontent.length; i++) {
    servicetabcontent[i].style.display = "none";
    }
    servicetablinks = document.getElementsByClassName("servicetablinks");
    for (i = 0; i < servicetablinks.length; i++) {
    servicetablinks[i].className = servicetablinks[i].className.replace(" activeservice", "");
    }
    document.getElementById(serviceFocus).style.display = "flex";
    event.currentTarget.className += " activeservice";
    };
    // Automatically open the default service tab
    document.getElementById("Opendefault").click();
    // Function to activate mega menu tabs
    function activateTab(section, mgtabRel) {
    const megatabs = section.querySelectorAll('.mega-mtabs li');
    const megaMtabContents = section.querySelectorAll('.mega-mtab-content');
    const megaMtabHeadings = section.querySelectorAll('.mega-mtab-heading');
    megatabs.forEach(mgtab => {
    mgtab.classList.toggle('active', mgtab.getAttribute('rel') === mgtabRel);
    });
    megaMtabContents.forEach(content => {
    content.style.display = content.id === mgtabRel ? 'flex' : 'none';
    });
    megaMtabHeadings.forEach(heading => {
    heading.classList.toggle('d_active', heading.getAttribute('rel') === mgtabRel);
    });
    }
    // Activate the first tab by default
    function activateFirstTab(section) {
    const firstTab = section.querySelector('.mega-mtabs li');
    if (firstTab) {
    firstTab.classList.add('active');
    const rel = firstTab.getAttribute('rel');
    activateTab(section, rel);
    }
    }
    // Apply activation to a specific section
    function setupSection(sectionId) {
    const section = document.getElementById(sectionId);
    activateFirstTab(section);
    // Add mouseover event to the span inside mega tabs li
    section.querySelectorAll('.mega-mtabs li span').forEach(span => {
    span.addEventListener('mouseover', function () {
    const mgtabRel = this.parentElement.getAttribute('rel'); // Get 'rel' from the parent li
    activateTab(section, mgtabRel);
    });
    });
    // Add click event to mega tab headings
    section.querySelectorAll('.mega-mtab-heading').forEach(heading => {
    heading.addEventListener('click', function () {
    const content = section.querySelector('#' + this.getAttribute('rel'));
    if (content.style.display === 'block') {
    content.style.display = 'none';
    this.classList.remove('d_active');
    } else {
    const megaMtabContents = section.querySelectorAll('.mega-mtab-content');
    const megaMtabHeadings = section.querySelectorAll('.mega-mtab-heading');
    megaMtabContents.forEach(c => c.style.display = 'none');
    megaMtabHeadings.forEach(h => h.classList.remove('d_active'));
    content.style.display = 'block';
    this.classList.add('d_active');
    }
    });
    });
    }
    // Setup sections independently
    const sections = [
    'serviceAreas',
    'industryFocus',
    'resources-section-menu',
    'locations-section-menu',
    'about-section-menu'
    ];
    sections.forEach(setupSection);
    });

    const pageSubheading = document.querySelectorAll('.page-link-block');
    pageSubheading.forEach(block => {
    const links = block.querySelectorAll('ul');
    const subheadingText = block.querySelector('.service-page-subheading a');
    if (subheadingText) {
    links.forEach(link => {
    link.addEventListener('mouseover', () => {
    subheadingText.classList.add('text-black'); 
    });
    link.addEventListener('mouseout', () => {
    subheadingText.classList.remove('text-black');
    });
    });
    }
    });
// Mega menu close button
var megaMenuCloseBtns=document.querySelectorAll(".mega-menu-close-btn");
for(i=0;i<=megaMenuCloseBtns.length;i++){
if(megaMenuCloseBtns[i]){
megaMenuCloseBtns[i].addEventListener('click',function(e){
e.preventDefault();
var p=this.parentNode.parentNode.parentNode;
p.style.display='none';
setTimeout(() => {
p.style.display='';
}, 600);
});
}
}