import React from "react"
import Product from "./product"
import Hero from "../Hero/hero"

class Filter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      products: []
    }
  }

  componentDidMount() {
    fetch("https://api.tictail.com/v1.26/stores/5znv/products?order_by=position").then((response) => {
      return response.json()
    }).then((json) => {
      this.setState({
        products: json
      })
    })
  }

  formatPrice(price) {
    return (price / 100).toFixed()
  }

  render() {
    const kategori = this.props.match.params.cate
    let { products } = this.state
    let heroImage = this.props.store.wallpapers.iphone.url
    if (kategori) {
      if (kategori === "sale") {
        products = products.filter((product) => {
          return product.sale_active
        })
      } else {
        products = products.filter((product) => {
          const categories = product.categories.map(category => category.title)
          return categories.includes(kategori)
        })
      }
      if (products.length > 0) {
        heroImage = products[products.length - 1].images[0].url
      }
    }
    return (
      <div className="productWrap">
        <div className="hero">
          {/* <Hero className="ProductPage" hero={this.props.prodImage} /> */}
          <Hero className="Home" hero={heroImage} />
        </div>
        <div className="productHeader">
          {products.length} products
        </div>

        <div className="productList">
          {products.map(item =>
            <Product
              updateProducts={this.props.updateCart}
              variationId={item.variations[0].id}
              prodSale={item.variations[0].sale_active}
              prodSalePrice={this.formatPrice(item.variations[0].sale_price)}
              prodName={item.title}
              prodImage={item.images[0].url}
              prodDescription={item.description}
              prodPrice={this.formatPrice(item.price)}
              prodOrgPrice={this.formatPrice(item.original_price)}
              prodId={item.id}
              category={item.categories[0].title} />)}
        </div>
      </div>
    )
  }

}

export default Filter
