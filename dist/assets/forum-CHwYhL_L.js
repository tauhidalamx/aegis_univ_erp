import"./main-C5NvtwyE.js";function e(){let e=`aegis_erp_session`,t=null;try{let n=sessionStorage.getItem(e);if(!n){window.location.href=`auth.html`;return}t=JSON.parse(n)}catch{window.location.href=`auth.html`;return}document.getElementById(`sidebar-name`).textContent=t.name,document.getElementById(`sidebar-role`).textContent=t.role.toUpperCase(),t.avatar&&(document.getElementById(`sidebar-avatar`).src=t.avatar,document.getElementById(`right-panel-avatar`).src=t.avatar),document.getElementById(`right-panel-name`).textContent=t.name,document.getElementById(`right-panel-email`).textContent=t.email,document.getElementById(`forum-logout-btn`).addEventListener(`click`,()=>{sessionStorage.removeItem(e),window.location.href=`auth.html`});let n=document.querySelectorAll(`.menu-item[data-tab]`),r=document.querySelectorAll(`.viewport-section`);n.forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault();let i=e.getAttribute(`data-tab`);n.forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`),r.forEach(e=>e.classList.remove(`active`));let a=document.getElementById(`view-${i}`);a&&a.classList.add(`active`),i===`feed`&&y(),i===`tasks`&&S(),i===`polls`&&w(),i===`calls`&&O()})});let i=document.getElementById(`creation-modal`),a=document.querySelectorAll(`.create-btn-trigger`),o=document.getElementById(`modal-close-trigger`),s=document.querySelectorAll(`.modal-tab`),c=document.querySelectorAll(`.modal-form-pane`);a.forEach(e=>{e.addEventListener(`click`,e=>{e.preventDefault(),i.classList.add(`active`)})}),o.addEventListener(`click`,()=>{i.classList.remove(`active`)}),s.forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-type`);s.forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`),c.forEach(e=>{e.classList.remove(`active`),e.id===`form-create-${t}`&&e.classList.add(`active`)})})});let l=document.getElementById(`file-drag-zone`),u=document.getElementById(`post-media-file`),d=document.getElementById(`file-name-indicator`);l.addEventListener(`click`,()=>u.click()),u.addEventListener(`change`,()=>{u.files.length>0&&(d.textContent=`Selected: ${u.files[0].name}`)}),l.addEventListener(`dragover`,e=>{e.preventDefault(),l.style.borderColor=`var(--color-brand-primary)`}),l.addEventListener(`dragleave`,()=>{l.style.borderColor=`var(--color-brand-border)`}),l.addEventListener(`drop`,e=>{e.preventDefault(),l.style.borderColor=`var(--color-brand-border)`,e.dataTransfer.files.length>0&&(u.files=e.dataTransfer.files,d.textContent=`Dropped: ${u.files[0].name}`)});let f=document.getElementById(`add-poll-option-field-btn`),p=document.getElementById(`poll-options-inputs`);f.addEventListener(`click`,()=>{let e=p.querySelectorAll(`.poll-option-field`).length,t=document.createElement(`input`);t.type=`text`,t.className=`poll-option-field`,t.placeholder=`Option ${e+1}`,t.required=!0,p.appendChild(t)});let m=[];async function h(){try{m=await(await fetch(`/api/users`)).json(),_(),v(),g()}catch(e){console.error(`Error fetching users:`,e)}}function g(){let e=document.getElementById(`active-contacts-list`);e&&(e.innerHTML=``,m.filter(e=>e.id!==t.id).slice(0,8).forEach((t,n)=>{let r=n%3!=0,i=document.createElement(`div`);i.className=`contact-row`,i.innerHTML=`
        <div class="contact-row-left">
          <img src="${t.avatar||`https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150`}" alt="${t.name}">
          <div class="contact-details">
            <span>${t.name}</span>
            <small>${t.role.toUpperCase()}</small>
          </div>
        </div>
        <span class="status-dot ${r?``:`offline`}"></span>
      `,e.appendChild(i)}))}function _(){let e=document.getElementById(`task-assignee`);e.innerHTML=`<option value="">Select Assignee</option>`,m.forEach(t=>{let n=document.createElement(`option`);n.value=t.id,n.textContent=`${t.name} (${t.role})`,e.appendChild(n)})}function v(){let e=document.getElementById(`story-tray-list`);e.innerHTML=``;let n=document.createElement(`div`);n.className=`story-circle`,n.innerHTML=`
      <div class="avatar-ring">
        <img src="${t.avatar||`https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150`}" alt="Self">
      </div>
      <span class="story-username">Your Story</span>
    `,e.appendChild(n),m.slice(0,10).forEach(n=>{if(n.id===t.id)return;let r=Math.random()>.3,i=document.createElement(`div`);i.className=`story-circle ${r?`online`:`offline`}`,i.innerHTML=`
        <div class="avatar-ring">
          <img src="${n.avatar}" alt="${n.name}">
        </div>
        <span class="story-username">${n.name.split(` `)[0]}</span>
      `,e.appendChild(i)})}async function y(){let e=document.getElementById(`feed-posts-list`);e.innerHTML=`<div class="text-brand-text-muted">Loading feed...</div>`;try{let n=await(await fetch(`/api/posts`)).json();if(e.innerHTML=``,n.length===0){e.innerHTML=`<div class="text-brand-text-muted">No posts published yet. Be the first!</div>`;return}n.forEach(n=>{let r=n.likes.includes(t.id),i=document.createElement(`div`);i.className=`post-card`,i.id=`card-${n.id}`;let a=``;n.type===`image`&&n.media_url?a=`
            <div class="post-media-content">
              <img src="${n.media_url}" alt="Post Media">
            </div>`:n.type===`video`&&n.media_url&&(a=`
            <div class="post-media-content">
              <video src="${n.media_url}" controls></video>
            </div>`);let o=n.comments.map(e=>`
          <div class="comment-card">
            <img src="${e.user_avatar}" alt="${e.user_name}">
            <div class="comment-text-wrapper">
              <strong>${e.user_name}</strong>
              <span>${e.content}</span>
            </div>
          </div>
        `).join(``);i.innerHTML=`
          <div class="post-header">
            <div class="post-creator-info">
              <img src="${n.user_avatar}" alt="${n.user_name}">
              <div class="post-creator-meta">
                <span class="creator-name">${n.user_name}</span>
                <span class="creator-role-badge">${n.user_role.toUpperCase()}</span>
              </div>
            </div>
            <span class="post-timestamp">${P(n.created_at)}</span>
          </div>

          <div class="post-content-body">
            <p>${n.content}</p>
          </div>

          ${a}

          <div class="post-actions-row">
            <button class="like-button-action ${r?`liked`:``}" data-id="${n.id}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span>Like</span>
            </button>
          </div>

          <div class="likes-counter-text">
            <span>${n.likes_count} likes</span>
          </div>

          <div class="post-comments-wrapper">
            <div class="comments-scroller">
              ${o}
            </div>
            <form class="add-comment-input-form" data-id="${n.id}">
              <input type="text" placeholder="Add a comment..." required>
              <button type="submit">Post</button>
            </form>
          </div>
        `,i.querySelector(`.like-button-action`).addEventListener(`click`,()=>b(n.id));let s=i.querySelector(`.add-comment-input-form`);s.addEventListener(`submit`,async e=>{e.preventDefault();let t=s.querySelector(`input`);if(await I(t.value)){L();return}x(n.id,t.value),t.value=``}),e.appendChild(i)})}catch(t){console.error(t),e.innerHTML=`<div class="text-brand-accent-ruby">Failed to load feed posts.</div>`}}async function b(e){try{await(await fetch(`/api/posts/${e}/like`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({user_id:t.id})})).json(),y()}catch(e){console.error(e)}}async function x(e,n){try{await fetch(`/api/posts/${e}/comments`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({user_id:t.id,content:n})}),y()}catch(e){console.error(e)}}async function S(){let e=document.getElementById(`todo-list`),t=document.getElementById(`in_progress-list`),n=document.getElementById(`done-list`);e.innerHTML=``,t.innerHTML=``,n.innerHTML=``;try{let r=await(await fetch(`/api/tasks`)).json(),i=0,a=0,o=0;r.forEach(r=>{let s=document.createElement(`div`);s.className=`task-card`;let c=`Start Task`,l=`in_progress`;r.status===`in_progress`?(c=`Complete`,l=`done`):r.status===`done`&&(c=`Reopen`,l=`todo`);let u=r.assignee_avatar||`https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150`,d=r.assignee_name||`Unassigned`;s.innerHTML=`
          <div class="task-card-header">${r.title}</div>
          <div class="task-card-desc">${r.description||`No description provided.`}</div>
          <div class="task-card-footer">
            <div class="task-assignee-avatar-row">
              <img src="${u}" alt="Assignee">
              <span>${d}</span>
            </div>
            <button class="task-status-control-btn">${c}</button>
          </div>
        `,s.querySelector(`.task-status-control-btn`).addEventListener(`click`,()=>{C(r.id,l)}),r.status===`todo`?(e.appendChild(s),i++):r.status===`in_progress`?(t.appendChild(s),a++):(n.appendChild(s),o++)}),document.getElementById(`todo-count`).textContent=i,document.getElementById(`in-progress-count`).textContent=a,document.getElementById(`done-count`).textContent=o}catch(e){console.error(e)}}async function C(e,t){try{await fetch(`/api/tasks/${e}`,{method:`PUT`,headers:{"Content-Type":`application/json`},body:JSON.stringify({status:t})}),S()}catch(e){console.error(e)}}async function w(){let e=document.getElementById(`polls-list`);e.innerHTML=`<div class="text-brand-text-muted">Loading polls...</div>`;try{let n=await(await fetch(`/api/polls`)).json();if(e.innerHTML=``,n.length===0){e.innerHTML=`<div class="text-brand-text-muted">No active campus polls available.</div>`;return}n.forEach(n=>{let r=n.voted_users.includes(t.id),i=document.createElement(`div`);i.className=`poll-card ${r?`voted`:``}`;let a=0;Object.values(n.votes).forEach(e=>a+=e);let o=``;n.options.forEach((e,t)=>{let i=n.votes[t]||0,s=a>0?Math.round(i/a*100):0;o+=`
            <div class="poll-option-row" data-index="${t}">
              <div class="poll-fill-percentage-bar" style="width: ${r?s:0}%"></div>
              <span class="poll-option-text">${e}</span>
              <span class="poll-option-stats-percent">${s}% (${i})</span>
            </div>
          `}),i.innerHTML=`
          <h3 class="poll-question-title">${n.question}</h3>
          <div class="poll-options-wrapper">
            ${o}
          </div>
          <div class="poll-card-footer">
            <span>Total: ${a} votes</span>
            <span>Created ${P(n.created_at)}</span>
          </div>
        `,r||i.querySelectorAll(`.poll-option-row`).forEach(e=>{e.addEventListener(`click`,()=>{let t=parseInt(e.getAttribute(`data-index`));T(n.id,t)})}),e.appendChild(i)})}catch(e){console.error(e)}}async function T(e,n){try{await fetch(`/api/polls/${e}/vote`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({user_id:t.id,option_index:n})}),w()}catch(e){console.error(e)}}let E=null,D=null;function O(){let e=document.getElementById(`calling-contacts-list`);e.innerHTML=``,m.forEach(n=>{if(n.id===t.id)return;let r=document.createElement(`div`);r.className=`call-contact-row`,r.innerHTML=`
        <div class="call-contact-meta">
          <img src="${n.avatar}" alt="Avatar">
          <span>${n.name}</span>
        </div>
        <button class="call-action-trigger-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 7a2 2 0 0 0-2.45-1.45L16 7V5a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2l4.55 1.45A2 2 0 0 0 23 17V7z"></path></svg>
        </button>
      `,r.addEventListener(`click`,()=>k(n)),e.appendChild(r)})}async function k(e){let t=document.getElementById(`call-status-overlay`),n=document.getElementById(`calling-recipient-avatar`),r=document.getElementById(`calling-recipient-name`),i=document.getElementById(`calling-status-text`),a=document.getElementById(`local-video`),o=document.getElementById(`remote-video`);n.src=e.avatar,r.textContent=e.name,i.textContent=`Ringing...`,t.style.display=`flex`;try{E=await navigator.mediaDevices.getUserMedia({video:!0,audio:!0}),a.srcObject=E,a.style.display=`block`}catch(e){console.warn(`Could not access camera/mic:`,e.message),i.textContent=`Camera blocked (Call preview mode)`}D=setTimeout(()=>{i.textContent=`Connecting...`,setTimeout(()=>{t.style.display=`none`,o.style.display=`block`,E?o.srcObject=E:(o.src=`https://www.w3schools.com/html/mov_bbb.mp4`,o.loop=!0,o.play())},1500)},3e3)}document.getElementById(`hangup-action-btn`).addEventListener(`click`,()=>{A()});function A(){clearTimeout(D),E&&E.getTracks().forEach(e=>e.stop());let e=document.getElementById(`local-video`),t=document.getElementById(`remote-video`),n=document.getElementById(`call-status-overlay`),r=document.getElementById(`calling-status-text`);e.srcObject=null,e.style.display=`none`,t.srcObject=null,t.src=``,t.style.display=`none`,r.textContent=`Disconnected`,n.style.display=`flex`}let j=document.getElementById(`form-create-post`);j.addEventListener(`submit`,async e=>{e.preventDefault();let n=document.getElementById(`post-textarea`).value;if(await I(n)){L();return}let r=u.files[0],a=`text`;r&&(a=r.type.startsWith(`video/`)?`video`:`image`);let o=new FormData;o.append(`user_id`,t.id),o.append(`content`,n),o.append(`type`,a),r&&o.append(`media`,r);try{(await(await fetch(`/api/posts`,{method:`POST`,body:o})).json()).success&&(i.classList.remove(`active`),j.reset(),d.textContent=`No file selected`,y())}catch(e){console.error(e)}});let M=document.getElementById(`form-create-task`);M.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`task-title`).value,n=document.getElementById(`task-desc`).value,r=document.getElementById(`task-assignee`).value;try{(await(await fetch(`/api/tasks`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({title:t,description:n,assignee_id:r})})).json()).success&&(i.classList.remove(`active`),M.reset(),S())}catch(e){console.error(e)}});let N=document.getElementById(`form-create-poll`);N.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`poll-question`).value,n=p.querySelectorAll(`.poll-option-field`),r=Array.from(n).map(e=>e.value).filter(e=>e.trim()!==``);try{(await(await fetch(`/api/polls`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({question:t,options:r})})).json()).success&&(i.classList.remove(`active`),N.reset(),p.innerHTML=`
          <label>Poll Options</label>
          <input type="text" class="poll-option-field" required placeholder="Option 1">
          <input type="text" class="poll-option-field" required placeholder="Option 2">
        `,w())}catch(e){console.error(e)}});function P(e){let t=new Date(e),n=new Date-t,r=Math.floor(n/1e3),i=Math.floor(r/60),a=Math.floor(i/60);return r<60?`Just now`:i<60?`${i}m ago`:a<24?`${a}h ago`:t.toLocaleDateString(void 0,{month:`short`,day:`numeric`})}let F=[`hate`,`bad`,`stupid`,`spam`,`trash`,`kill`,`dumb`,`horrible`,`worst`,`useless`,`fake`];async function I(e){if(!window.tf)return!1;let t=e.toLowerCase().split(/\s+/),n=F.map(e=>+!!t.includes(e)),r=tf.tensor1d(n),i=tf.onesLike(r),a=tf.mul(r,i),o=tf.sum(a),s=(await o.data())[0];return r.dispose(),i.dispose(),a.dispose(),o.dispose(),s>=1}function L(){let e=document.getElementById(`tf-moderation-toast`);e&&(e.classList.add(`active`),setTimeout(()=>{e.classList.remove(`active`)},4e3))}h(),y()}document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,e):e();