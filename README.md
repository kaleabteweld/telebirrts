# telebirrts
typescript enforced teleBirr API package
<div class="markdown prose w-full break-words dark:prose-invert light">
<h1>TeleBirr API</h1>
<p>This is a simple TeleBirr API for Node.js that encapsulates HTTP requests. It provides an easy-to-use interface for making payments using the H5WebPayment method.</p>
<h2>DEV Installation AND USAGE</h2>
<h3> likely did not put it in npm or yard Yet, just clone and test with test/index.ts and any issues will be appreciated</h3>
<pre><div class="bg-black mb-4 rounded-md"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans"><span class="">sh</span><button class="flex ml-auto gap-2"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>Copy code</button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-sh"> yarn run dev
</code></div></div></pre>
<h2>Installation</h2>
<p> To use this API, you need to have Node.js installed on your system. You can install Node.js from the official website.</p><p>To install the TeleBirr API, you can use npm or yarn:</p><pre><div class="bg-black mb-4 rounded-md"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans"><span class="">sh</span><button class="flex ml-auto gap-2"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>Copy code</button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-sh">npm install telebirr-node-api
</code></div></div></pre><p>or</p><pre><div class="bg-black mb-4 rounded-md"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans"><span class="">sh</span><button class="flex ml-auto gap-2"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>Copy code</button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-sh">yarn add telebirr-node-api
</code></div></div></pre><h2>Usage</h2><p>To use the TeleBirr API, you first need to create an instance of the <code>Telebirr</code> class, which encapsulates the basic configuration of the API. You can then create an instance of the <code>H5WebPayment</code> class, which represents a payment made using the H5WebPayment method. Finally, you can call the <code>sendRequest</code> method on the <code>H5WebPayment</code> instance to initiate the payment request.</p><pre><div class="bg-black mb-4 rounded-md"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans"><span class="">typescript</span><button class="flex ml-auto gap-2"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>Copy code</button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">Telebirr</span> <span class="hljs-keyword">from</span> <span class="hljs-string">"telebirr-node-api"</span>;
<span class="hljs-keyword">import</span> H5WebPayment <span class="hljs-keyword">from</span> <span class="hljs-string">"telebirr-node-api/paymentMethods/H5WebPayment"</span>;

<span class="hljs-keyword">const</span> <span class="hljs-attr">telebirr</span>: <span class="hljs-title class_">Telebirr</span> = <span class="hljs-title class_">Telebirr</span>.<span class="hljs-title function_">fromOneValue</span>({
    <span class="hljs-attr">appid</span>: <span class="hljs-string">"123456"</span>,
    <span class="hljs-attr">appkey</span>: <span class="hljs-string">"123456"</span>,
    <span class="hljs-attr">baseUrl</span>: <span class="hljs-string">"http://127.0.0.1/"</span>,
    <span class="hljs-attr">publicKey</span>: <span class="hljs-string">"123456"</span>,
    <span class="hljs-attr">notifyUrl</span>: <span class="hljs-string">"https://www.example.com"</span>,
    <span class="hljs-attr">timeoutExpress</span>: <span class="hljs-string">"123456"</span>,
    <span class="hljs-attr">receiveName</span>: <span class="hljs-string">"123456"</span>,
    <span class="hljs-attr">shortCode</span>: <span class="hljs-string">"123456"</span>,
});

<span class="hljs-keyword">const</span> <span class="hljs-attr">webPayment</span>: H5WebPayment = <span class="hljs-keyword">new</span> <span class="hljs-title function_">H5WebPayment</span>(telebirr, <span class="hljs-string">"https://www.example.com"</span>);

webPayment.<span class="hljs-title function_">addTransaction</span>({
    <span class="hljs-attr">nonce</span>: <span class="hljs-string">"123456"</span>,
    <span class="hljs-attr">outTradeNo</span>: <span class="hljs-string">"123456"</span>,
    <span class="hljs-attr">subject</span>: <span class="hljs-string">"123456"</span>,
    <span class="hljs-attr">totalAmount</span>: <span class="hljs-string">"123456"</span>,
});

<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">pay</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> webPayment.<span class="hljs-title function_">sendRequest</span>();
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">"res: "</span>, res);
    } <span class="hljs-keyword">catch</span> (error) {
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(error);
    }
}

<span class="hljs-title function_">pay</span>();
</code></div></div></pre><p>In this example, we first create an instance of the <code>Telebirr</code> class, passing in the basic configuration options for the API. We then create an instance of the <code>H5WebPayment</code> class, passing in the <code>Telebirr</code> instance and the URL of the page to redirect the user to after the payment is completed.</p><p>We then add a transaction using the <code>addTransaction</code> method on the <code>H5WebPayment</code> instance. Finally, we call the <code>sendRequest</code> method on the <code>H5WebPayment</code> instance to initiate the payment request.</p><h2>Contributing</h2><p>Contributions are welcome! If you have any suggestions or find any issues with the API, please open an issue on the GitHub repository.</p><h2>License</h2><p>This project is licensed under the MIT License - see the LICENSE file for details.</p></div>