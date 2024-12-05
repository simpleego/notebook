```js
// App.svelte
<script>
	import cartItems from './cart.js'; // cartItems 자리에는 원하는 이름을 쓰면 된다.
	export let name;
	import {onDestroy} from 'svelte';

	let items;

	const products =['과자','면도기','선풍기','탈수기','노트북','휴대폰','장갑','구두','립스틱','비누'] 

    cartItems.subscribe(its => {
        items = its
    });

	function addToCart() {
		// cartItems.set([]); // 해당 store에 적용한 subscribe 기능이 실행된다.
		cartItems.update(items => {
			return [
				...items,
				{
					id: 'p'+(items.length+1),
					title: products[Math.floor(Math.random()*products.length)],
					price: 10000+ Math.floor(Math.random()*10000)
				}
			]
		}); 
	}

	const unsubscribe =  cartItems.subscribe(its => {
        items = its
    });

    onDestroy(() => {
        if (unsubscribe) {
            unsubscribe();
        }
    })

</script>
```
```html
<main>
	<h1>Hello {name}!</h1>
	<!-- {#each items as item }
    	<span>아이디 : {item['id']} </span>
    	<span>상품명 : {item['title']}</span>
    	<span>가격 : {item['price']}</span>
		<br>
  	{/each} -->
	<button on:click={addToCart}>상품추가</button>
	<section>
		<h1>Cart</h1>
		<ul>
			{#each $cartItems as item (item.id)}
				<span>id={item.id}</span>  
				<span>title={item.title} </span>
				<span>price={item.price} </span>
				<br>
			{:else}
				<p>No items in cart yet!</p>
			{/each}
		</ul>
	</section>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>

```
