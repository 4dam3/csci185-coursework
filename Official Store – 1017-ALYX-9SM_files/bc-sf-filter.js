// Override Settings
var bcSfFilterSettings = {
    general: {
      limit: 50,
      /* Optional */
      loadProductFirst: true,
    },
  };

  /*
  <div class="grid-item gallery-child product-item third">
    <div class="gallery-inner-child">
    <a href="/collections/man-trousers/products/waxed-elastic-band-short">
      <div class="item-image mh-image">
          <img src="//cdn.shopify.com/s/files/1/0007/2918/6359/products/AAMSO0007-1_084afdcd-8de1-4d91-b0b1-87b293c4d1ad_1024x.jpg?v=1525341335" alt="WAXED ELASTIC BAND SHORT">
      </div>
      <div class="item-details mh-details">
              <span class="product-barcode">AAMSO0007001</span>
          <h3 class="product-title">WAXED ELASTIC BAND SHORT</h3>
          <span class="product-price">
            <span class="money" data-currency-eur="€324,00" data-currency-aud="$509.02 AUD" data-currency="AUD">$509.02 AUD</span>
          </span>
      </div>

    </a>
    </div>
  </div>

      // Grid Template
      'productGridItemHtml': '<div class="grid-item gallery-child product-item third {{soldOutClass}} {{saleClass}}">' +
                                  '<div class="gallery-inner-child">' +
                                      '<a href="{{itemUrl}}" class="grid-link">' +
                                          '<div class="item-image mh-image">' +
                                            '<img src="{{itemThumbUrl}}" alt="{{itemTitle}}" />' +
                                          '</div>' +
                                          '<div class="item-details mh-details">' +
                                              '<h3 class="product-title">{{itemTitle}}</h3>'
                                              '<span class="product-price">{{itemPrice}}</span>' +
                                          '</div>' +
                                      '</a>' +
                                  '</div>' +
                              '</div>',

      // Grid Template
      'productGridItemHtml': '<div class="grid-item gallery-child product-item third {{soldOutClass}} {{saleClass}}">' +
                                  '<div class="gallery-inner-child">' +
                                      '<a href="{{itemUrl}}" class="grid-link">' +
                                          '<div class="item-image mh-image">' +
                                          '<span class="grid-link__image grid-link__image--product">' +
                                              '{{itemSaleLabel}}' +
                                              '{{itemSoldOutLabel}}' +
                                              '<span class="grid-link__image-centered"><img src="{{itemThumbUrl}}" alt="{{itemTitle}}" /></span>' +
                                          '</span>' +
                                          '<p class="grid-link__title">{{itemTitle}}</p>' +
                                          '{{itemVendor}}' +
                                          '{{itemPrice}}' +
                                      '</a>' +
                                  '</div>' +
                              '</div>',

      'soldOutClass': 'sold-out',
      'saleClass': 'on-sale',
      'soldOutLabelHtml': '<span class="badge"><span>' + bcSfFilterConfig.label.sold_out + '</span></span>',
      'saleLabelHtml': '<span class="badge"><span>' + bcSfFilterConfig.label.sale + '</span></span>',
      'vendorHtml': '<div>{{itemVendorLabel}}</div>',
  */

  // Declare Templates
  var bcSfFilterTemplate = {
    soldOutClass: "sold-out",
    saleClass: "on-sale",
    raffleClass: "raffle",
    soldOutLabelHtml:
      '<span class="sold-out-badge badge"><span>Sold Out</span></span>',
    saleLabelHtml: '<span class="sale-badge badge"><span>Sale</span></span>',
    raffleLabelHtml:
      '<span class="raffle-badge badge"><span>Raffle</span></span>',
    vendorHtml: "<div>{{itemVendorLabel}}</div>",


    // Grid Template
    productGridItemHtml:
      '<div class="grid-item gallery-child product-item third {{raffleClass}}{{soldOutClass}}{{saleClass}}">' +
      '<div class="gallery-inner-child">' +
      '<a href="{{itemUrl}}" class="grid-link">' +
      '<div class="item-image mh-image">' +
      '<img src="{{itemThumbUrl}}" alt="{{itemTitle}}" />' +
      "</div>" +
      '<div class="item-details mh-details">' +
      "{{itemSaleLabel}}" +
      "{{itemSoldOutLabel}}" +
      "{{raffleLabel}}" +
      '<span class="product-barcode">{{itemSku}}</span>' +
      '<h3 class="product-title">{{itemTitle}}</h3>' +
      '<span class="product-price">{{itemPrice}}</span>' +
      "</div>" +
      "</a>" +
      "</div>" +
      "</div>",

    // Pagination Template
    previousActiveHtml: '<li><a href="{{itemUrl}}">&larr;</a></li>',
    previousDisabledHtml: '<li class="disabled"><span>&larr;</span></li>',
    nextActiveHtml: '<li><a href="{{itemUrl}}">&rarr;</a></li>',
    nextDisabledHtml: '<li class="disabled"><span>&rarr;</span></li>',
    pageItemHtml: '<li><a href="{{itemUrl}}">{{itemTitle}}</a></li>',
    pageItemSelectedHtml: '<li><span class="active">{{itemTitle}}</span></li>',
    pageItemRemainHtml: "<li><span>{{itemTitle}}</span></li>",
    paginateHtml:
      '<ul class="pagination-custom">{{previous}}{{pageItems}}{{next}}</ul>',

    // Sorting Template
    sortingHtml:
      '<label class="label--hidden">' +
      bcSfFilterConfig.label.sorting +
      '</label><select class="collection-sort__input">{{sortingItems}}</select>',
  };

  /************************** BUILD PRODUCT LIST **************************/

  // Build Product Grid Item
  BCSfFilter.prototype.buildProductGridItem = function (data, index) {
    /*** Prepare data ***/
    var cart_currency = $.cookie('cart_currency').toLowerCase();
    var appendPrice = '_'+cart_currency;
    console.log('cart currency '+cart_currency);

    //FIX FOR CHANGE CURRENCY!!! 
    data.price_min =  data['price_min'+appendPrice];
    data.price_max =  data['price_max'+appendPrice];
    data.compare_at_price_min = data['compare_at_price_min'+appendPrice];


    var images = data.images_info;
    (data.price_min *= 100),
      (data.price_max *= 100),
      (data.compare_at_price_min *= 100),
      (data.compare_at_price_max *= 100); // Displaying price base on the policy of Shopify, have to multiple by 100
    var soldOut = !data.available; // Check a product is out of stock
    var onSale = data.compare_at_price_min > data.price_min; // Check a product is on sale
    var priceVaries = data.price_min != data.price_max; // Check a product has many prices
    // Get First Variant (selected_or_first_available_variant)
    var firstVariant = data["variants"][0];
    //get raffle tag
    var raffle = false;
    //get date time
    var expire = false;
    var nowDate = Date.now();
    //check raffle_end expire
    console.log(data.tags);
    var tag_raffleEnd = data.tags.find((tag) => tag.includes("raffleEnd"));
    if (tag_raffleEnd != null) {
      var strDate = tag_raffleEnd.split("_");
      //console.log(strDate[1]);
      //console.log(nowDate);
      var split = strDate[1].split("/");
      //console.log(split);
      var split2 = split[2].split(" ");
      //console.log(split2);
      var split3 = split2[1].split(":");
      //console.log(split3);
      var year = split2[0];
      //console.log("year: " + year);
      //var splitMonth = split[1].split("0");
      var month = split[1];
      month--;
      //console.log("month: " + month);
      var day = split[0];
      //console.log("day: " + day);
      var hour = split3[0];
      var minute = split3[1];
      var expireDate = new Date(
        parseInt(year, 10),
        parseInt(month, 10),
        parseInt(day, 10),
        parseInt(hour, 10),
        parseInt(minute, 10)
      );
      //console.log(expireDate);
      //console.log(expireDate.getTime());
      if (expireDate.getTime() < nowDate) {
        expire = true;
      }
    }

    if (
      data.tags.includes("raffle") &&
      !data.tags.includes("raffle_close") &&
      !expire
    ) {
      raffle = true;
    }

    if (getParam("variant") !== null && getParam("variant") != "") {
      var paramVariant = data.variants.filter(function (e) {
        return e.id == getParam("variant");
      });
      if (typeof paramVariant[0] !== "undefined") firstVariant = paramVariant[0];
    } else {
      for (var i = 0; i < data["variants"].length; i++) {
        if (data["variants"][i].available) {
          firstVariant = data["variants"][i];
          break;
        }
      }
    }

    //AAUBA0001001
    //AA-U-SS-0017-0-02
    //AAMSH0009001
    //var sku = firstVariant.sku;
    var sku = data["variants"][0].sku;
 /* VECCHIA VISUALIZZAZIONE SKU */
 /*
  var newsku1 = sku.split('_');
  var newlenght = newsku1.length - 1;
  var finalsku = newsku1[0] ;
  for(i = 1; i < newlenght-1; i++){
      finalsku =finalsku+'_'+newsku1[i]
  }
  var sku = finalsku;
  var str1 = sku.slice(0, 2) + "-";
  var str2 = sku.slice(2, 3) + "-";
  var str3 = sku.slice(3, 5) + "-";
  var str4 = sku.length > 9 ? sku.slice(5, 9) + "-" : sku.slice(5, 9);
  var str5 = sku.length > 9 ? sku.slice(9, 10) + "-" : "";
  var str6 = sku.length > 9 ? sku.slice(10, sku.length) : "";
  var new_sku = str1 + str2 + str3 + str4 + str5 + str6;
  */

  /* NUOVA VISUALIZZAZIONE SKU */
  sku = sku.split("_");
  var new_sku = "";
  for(let i=0; i<sku.length-2; i++){
    new_sku = new_sku + sku[i];
  }
    /*** End Prepare data ***/

    // Get Template
    var itemHtml = bcSfFilterTemplate.productGridItemHtml;

    //console.log(images);

    /*
     * 1. If tags contain Man and Woman then product is unisex
     * 2. Find current collection
     * 3. Find if any image alts == current collection
     * 4. If so output that image
     * 5. If not, show featured image
     */
    //console.log(images);
    //console.log(images);
    var id = $("body").attr("id");
    var collection =
      id.substring(0, id.indexOf("-")) != ""
        ? id.substring(0, id.indexOf("-"))
        : id;
    var featured_image = images[0]["src"];
    if (collection == "man" || collection == "woman") {
      //hurray we're in a collection
      //find image based on collection

      for (var i = 0; i < images.length; i++) {
        //console.log(images[i]['src']);
        var src = images[i]["src"];
        var filename = src.substring(src.lastIndexOf("/") + 1);
        filename = filename.substring(filename.lastIndexOf("-") + 1);
        filename = filename.substring(0, filename.indexOf("."));
        filename = filename.toLowerCase();
        if (filename == collection) {
          featured_image = images[i]["src"];
          console.log("found collection featured image");
          break;
        }
      }
      //console.log(featured_image)
    }
    // Add Thumbnail
    var itemThumbUrl =
      images.length > 0
        ? this.optimizeImage(featured_image)
        : bcSfFilterConfig.general.no_image_url;
    itemThumbUrl = itemThumbUrl.split("large").join("1024x");
    itemHtml = itemHtml.replace(/{{itemThumbUrl}}/g, itemThumbUrl);

    // Add Price
    var itemPriceHtml = "";
    if (data.template_suffix != "gift-card") {
      if (data.title != "") {
        itemPriceHtml += '<p class="grid-link__meta">';
        if (onSale) {
          itemPriceHtml +=
            '<s class="grid-link__sale_price">' +
            this.formatMoney(data.compare_at_price_min) +
            "</s> ";
        }
        if (priceVaries) {
          //   itemPriceHtml += (bcSfFilterConfig.label.from_price).replace(/{{ price }}/g, this.formatMoney(data.price_min));
          itemPriceHtml += this.formatMoney(data.price_min);
        } else {
          itemPriceHtml += this.formatMoney(data.price_min);
        }
        itemPriceHtml += "</p>";
      }
    } else {
      if (data.title != "") {
        itemPriceHtml += '<p class="grid-link__meta">';
        if (priceVaries) {
          itemPriceHtml +=
            this.formatMoney(data.price_min) +
            " - " +
            this.formatMoney(data.price_max);
        } else {
          itemPriceHtml += this.formatMoney(data.price_min);
        }
        itemPriceHtml += "</p>";
      }
    }
    itemHtml = itemHtml.replace(/{{itemPrice}}/g, itemPriceHtml);

    // Add soldOut class
    var soldOutClass = soldOut ? bcSfFilterTemplate.soldOutClass : "";
    itemHtml = itemHtml.replace(/{{soldOutClass}}/g, soldOutClass);

    // Add onSale class
    var saleClass = onSale ? bcSfFilterTemplate.saleClass : "";
    itemHtml = itemHtml.replace(/{{saleClass}}/g, saleClass);

    //Add raffle class
    var raffleClass = raffle ? bcSfFilterTemplate.raffleClass : "";
    itemHtml = itemHtml.replace(/{{raffleClass}}/g, raffleClass);

    // Add soldOut Label
    var itemSoldOutLabelHtml = soldOut ? bcSfFilterTemplate.soldOutLabelHtml : "";
    itemHtml = itemHtml.replace(/{{itemSoldOutLabel}}/g, itemSoldOutLabelHtml);

    // Add onSale Label
    var itemSaleLabelHtml = onSale ? bcSfFilterTemplate.saleLabelHtml : "";
    itemHtml = itemHtml.replace(/{{itemSaleLabel}}/g, itemSaleLabelHtml);

    // Add raffle label
    var raffleLabelHtml = raffle ? bcSfFilterTemplate.raffleLabelHtml : "";
    itemHtml = itemHtml.replace(/{{raffleLabel}}/g, raffleLabelHtml);

    // Add Vendor
    var itemVendorHtml = bcSfFilterConfig.custom.vendor_enable
      ? bcSfFilterTemplate.vendorHtml.replace(/{{itemVendorLabel}}/g, data.vendor)
      : "";
    itemHtml = itemHtml.replace(/{{itemVendor}}/g, itemVendorHtml);

    // Add SKU
    var itemSkuHtml = new_sku;
    itemHtml = itemHtml.replace(/{{itemSku}}/g, itemSkuHtml);

    // Add main attribute (Always put at the end of this function)
    itemHtml = itemHtml.replace(/{{itemId}}/g, data.id);
    itemHtml = itemHtml.replace(/{{itemHandle}}/g, data.handle);
    itemHtml = itemHtml.replace(/{{itemTitle}}/g, data.title);
    itemHtml = itemHtml.replace(/{{itemUrl}}/g, this.buildProductItemUrl(data));

    return itemHtml;
  };

  // Build Product List Item
  BCSfFilter.prototype.buildProductListItem = function (data) {
    // // Add Description
    // var itemDescription = jQ('<p>' + data.body_html + '</p>').text();
    // // Truncate by word
    // itemDescription = (itemDescription.split(" ")).length > 51 ? itemDescription.split(" ").splice(0, 51).join(" ") + '...' : itemDescription.split(" ").splice(0, 51).join(" ");
    // // Truncate by character
    // itemDescription = itemDescription.length > 350 ? itemDescription.substring(0, 350) + '...' : itemDescription.substring(0, 350);
    // itemHtml = itemHtml.replace(/{{itemDescription}}/g, itemDescription);
  };

  // Customize data to suit the data of Shopify API
  BCSfFilter.prototype.prepareProductData = function (data) {
    for (var k in data) {
      // Featured image
      if (data["images_info"] > 0) {
        data[k]["featured_image"] = data["images_info"][0];
      } else {
        data[k]["featured_image"] = { width: "", height: "", aspect_ratio: 0 };
      }

      // Add Options
      var optionsArr = [];
      for (var i in data[k]["options_with_values"]) {
        optionsArr.push(data[k]["options_with_values"][i]["name"]);
      }
      data[k]["options"] = optionsArr;

      // Customize variants
      for (var i in data[k]["variants"]) {
        var variantOptionArr = [];
        var count = 1;
        var variant = data[k]["variants"][i];
        // Add Options
        var variantOptions = variant["merged_options"];
        if (Array.isArray(variantOptions)) {
          for (var j = 0; j < variantOptions.length; j++) {
            var temp = variantOptions[j].split(":");
            data[k]["variants"][i]["option" + (parseInt(j) + 1)] = temp[1];
            data[k]["variants"][i]["option_" + temp[0]] = temp[1];
            variantOptionArr.push(temp[1]);
          }
          data[k]["variants"][i]["options"] = variantOptionArr;
        }
        data[k]["variants"][i]["compare_at_price"] =
          parseFloat(data[k]["variants"][i]["compare_at_price"]) * 100;
        data[k]["variants"][i]["price"] =
          parseFloat(data[k]["variants"][i]["price"]) * 100;
      }

      // Add Description
      data[k]["description"] = data[k]["body_html"];
    }
    return data;
  };

  /************************** END BUILD PRODUCT LIST **************************/

  // Build Pagination
  BCSfFilter.prototype.buildPagination = function (totalProduct) {
    if (this.getSettingValue("general.paginationType") == "default") {
      // Get page info
      var currentPage = parseInt(this.queryParams.page);
      var totalPage = Math.ceil(totalProduct / this.queryParams.limit);

      // If it has only one page, clear Pagination
      if (totalPage == 1) {
        jQ(this.selector.bottomPagination).html("");
        return false;
      }

      if (this.getSettingValue("general.paginationType") == "default") {
        var paginationHtml = bcSfFilterTemplate.paginateHtml;

        // Build Previous
        var previousHtml =
          currentPage > 1
            ? bcSfFilterTemplate.previousActiveHtml
            : bcSfFilterTemplate.previousDisabledHtml;
        previousHtml = previousHtml.replace(
          /{{itemUrl}}/g,
          this.buildToolbarLink("page", currentPage, currentPage - 1)
        );
        paginationHtml = paginationHtml.replace(/{{previous}}/g, previousHtml);

        // Build Next
        var nextHtml =
          currentPage < totalPage
            ? bcSfFilterTemplate.nextActiveHtml
            : bcSfFilterTemplate.nextDisabledHtml;
        nextHtml = nextHtml.replace(
          /{{itemUrl}}/g,
          this.buildToolbarLink("page", currentPage, currentPage + 1)
        );
        paginationHtml = paginationHtml.replace(/{{next}}/g, nextHtml);

        // Create page items array
        var beforeCurrentPageArr = [];
        for (
          var iBefore = currentPage - 1;
          iBefore > currentPage - 3 && iBefore > 0;
          iBefore--
        ) {
          beforeCurrentPageArr.unshift(iBefore);
        }
        if (currentPage - 4 > 0) {
          beforeCurrentPageArr.unshift("...");
        }
        if (currentPage - 4 >= 0) {
          beforeCurrentPageArr.unshift(1);
        }
        beforeCurrentPageArr.push(currentPage);

        var afterCurrentPageArr = [];
        for (
          var iAfter = currentPage + 1;
          iAfter < currentPage + 3 && iAfter <= totalPage;
          iAfter++
        ) {
          afterCurrentPageArr.push(iAfter);
        }
        if (currentPage + 3 < totalPage) {
          afterCurrentPageArr.push("...");
        }
        if (currentPage + 3 <= totalPage) {
          afterCurrentPageArr.push(totalPage);
        }

        // Build page items
        var pageItemsHtml = "";
        var pageArr = beforeCurrentPageArr.concat(afterCurrentPageArr);
        for (var iPage = 0; iPage < pageArr.length; iPage++) {
          if (pageArr[iPage] == "...") {
            pageItemsHtml += bcSfFilterTemplate.pageItemRemainHtml;
          } else {
            pageItemsHtml +=
              pageArr[iPage] == currentPage
                ? bcSfFilterTemplate.pageItemSelectedHtml
                : bcSfFilterTemplate.pageItemHtml;
          }
          pageItemsHtml = pageItemsHtml.replace(/{{itemTitle}}/g, pageArr[iPage]);
          pageItemsHtml = pageItemsHtml.replace(
            /{{itemUrl}}/g,
            this.buildToolbarLink("page", currentPage, pageArr[iPage])
          );
        }
        paginationHtml = paginationHtml.replace(/{{pageItems}}/g, pageItemsHtml);

        jQ(this.selector.bottomPagination).html(paginationHtml);
      }
    }
  };

  /************************** BUILD TOOLBAR **************************/

  // Build Sorting
  BCSfFilter.prototype.buildFilterSorting = function () {
    if (bcSfFilterTemplate.hasOwnProperty("sortingHtml")) {
      jQ(this.selector.topSorting).html("");

      var sortingArr = this.getSortingList();
      if (sortingArr) {
        // Build content
        var sortingItemsHtml = "";
        for (var k in sortingArr) {
          sortingItemsHtml +=
            '<option value="' + k + '">' + sortingArr[k] + "</option>";
        }
        var html = bcSfFilterTemplate.sortingHtml.replace(
          /{{sortingItems}}/g,
          sortingItemsHtml
        );
        jQ(this.selector.topSorting).html(html);

        // Set current value
        jQ(this.selector.topSorting + " select").val(this.queryParams.sort);
      }
    }

    if ("undefined" != typeof checkShopifyFormatMoney) {
      //$m("<style type=\"text/css\">span.money{ display: none; }</style>").appendTo("head");
      checkShopifyFormatMoney();
    }
  };

  // Build Display type (List / Grid / Collage)
  // BCSfFilter.prototype.buildFilterDisplayType = function() {
  //     var itemHtml = '<a href="' + this.buildToolbarLink('display', 'list', 'grid') + '" title="Grid view" class="change-view bc-sf-filter-display-grid" data-view="grid"><span class="icon-fallback-text"><i class="fa fa-th" aria-hidden="true"></i><span class="fallback-text">Grid view</span></span></a>';
  //     itemHtml += '<a href="' + this.buildToolbarLink('display', 'grid', 'list') + '" title="List view" class="change-view bc-sf-filter-display-list" data-view="list"><span class="icon-fallback-text"><i class="fa fa-list" aria-hidden="true"></i><span class="fallback-text">List view</span></span></a>';
  //     jQ(this.selector.topDisplayType).html(itemHtml);

  //     // Active current display type
  //     jQ(this.selector.topDisplayType).find('.bc-sf-filter-display-list').removeClass('active');
  //     jQ(this.selector.topDisplayType).find('.bc-sf-filter-display-grid').removeClass('active');
  //     if (this.queryParams.display == 'list') {
  //         jQ(this.selector.topDisplayType).find('.bc-sf-filter-display-list').addClass('active');
  //     } else if (this.queryParams.display == 'grid') {
  //         jQ(this.selector.topDisplayType).find('.bc-sf-filter-display-grid').addClass('active');
  //     }
  // };

  /************************** END BUILD TOOLBAR **************************/

  // Add additional feature for product list, used commonly in customizing product list
  BCSfFilter.prototype.buildExtrasProductList = function (data, eventType) {};

  // Build additional elements
  BCSfFilter.prototype.buildAdditionalElements = function (data, eventType) {
    this.buildRobotsMetaTag();
  };
  /* boost-start-2.4.2 */
  /* If you upgrade the lib to the version >= 2.4.2, please comment the functions below out */
  BCSfFilter.prototype.buildRobotsMetaTag = function (data) {
    var self = this;
    var metaContent = 'meta[content="noindex,nofollow"]';
    if (
      self.checkIfPFParamsPartOfAURL() === true &&
      jQ("head").find(metaContent).length === 0
    ) {
      var m = document.createElement("meta");
      m.name = "robots";
      m.content = "noindex,nofollow";
      document.head.appendChild(m);
    }
  };
  BCSfFilter.prototype.checkIfPFParamsPartOfAURL = function () {
    var self = this;
    if (
      window.location.search.length > 0 &&
      window.location.search.indexOf("pf_") > 0
    ) {
      return true;
    }
    return false;
  };
  /* boost-end-2.4.2 */

  // Fix image url issue of swatch option
  function getFilePath(fileName, ext, version) {
    var self = bcsffilter;
    var ext = typeof ext !== "undefined" ? ext : "png";
    var version = typeof version !== "undefined" ? version : "1";
    var prIndex = self.fileUrl.lastIndexOf("?");
    if (prIndex > 0) {
      var filePath = self.fileUrl.substring(0, prIndex);
    } else {
      var filePath = self.fileUrl;
    }
    filePath += fileName + "." + ext + "?v=" + version;
    return filePath;
  }

  // Build Default layout
  //BCSfFilter.prototype.buildDefaultElements=function(){var isiOS=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream,isSafari=/Safari/.test(navigator.userAgent),isBackButton=window.performance&&window.performance.navigation&&2==window.performance.navigation.type;if(!(isiOS&&isSafari&&isBackButton)){var self=this,url=window.location.href.split("?")[0],searchQuery=self.isSearchPage()&&self.queryParams.hasOwnProperty("q")?"&q="+self.queryParams.q:"";window.location.replace(url+"?view=bc-original"+searchQuery)}};

  //BCSfFilter.prototype.getFilterData=function(eventType,errorCount){function BCSend(eventType,errorCount){var self=bcsffilter;var errorCount=typeof errorCount!=="undefined"?errorCount:0;self.showLoading();if(typeof self.buildPlaceholderProductList=="function"){self.buildPlaceholderProductList(eventType)}self.beforeGetFilterData(eventType);self.prepareRequestParams(eventType);self.queryParams["callback"]="BCSfFilterCallback";self.queryParams["event_type"]=eventType;var url=self.isSearchPage()?self.getApiUrl("search"):self.getApiUrl("filter");var script=document.createElement("script");script.type="text/javascript";var timestamp=(new Date).getTime();script.src=url+"?t="+timestamp+"&"+jQ.param(self.queryParams);script.id="bc-sf-filter-script";script.async=true;var resendAPITimer,resendAPIDuration;resendAPIDuration=2e3;script.addEventListener("error",function(e){if(typeof document.getElementById(script.id).remove=="function"){document.getElementById(script.id).remove()}else{document.getElementById(script.id).outerHTML=""}if(errorCount<3){errorCount++;if(resendAPITimer){clearTimeout(resendAPITimer)}resendAPITimer=setTimeout(self.getFilterData("resend",errorCount),resendAPIDuration)}else{self.buildDefaultElements(eventType)}});document.getElementsByTagName("head")[0].appendChild(script);script.onload=function(){if(typeof document.getElementById(script.id).remove=="function"){document.getElementById(script.id).remove()}else{document.getElementById(script.id).outerHTML=""}}}this.requestFilter(BCSend,eventType,errorCount)};BCSfFilter.prototype.requestFilter=function(sendFunc,eventType,errorCount){sendFunc(eventType,errorCount)};

  /* start-boost-2.4.8 */
  BCSfFilter.prototype.buildFilterOptionItem = function (
    html,
    iLabel,
    iValue,
    fOType,
    fOId,
    fOLabel,
    fODisplayType,
    fOSelectType,
    fOItemValue,
    fOData
  ) {
    var keepValuesStatic = fOData.hasOwnProperty("keepValuesStatic")
      ? fOData.keepValuesStatic
      : false;
    if (
      fOType == "review_ratings" &&
      this.getSettingValue("general.ratingSelectionStyle") == "text"
    ) {
      var title = this.getReviewRatingsLabel(fOItemValue.from);
    } else {
      var title = this.customizeFilterOptionLabel(iLabel, fOData.prefix, fOType);
    }
    if (keepValuesStatic === true) var productNumber = null;
    else
      var productNumber = fOItemValue.hasOwnProperty("doc_count")
        ? fOItemValue.doc_count
        : 0;
    html = html.replace(
      /{{itemLabel}}/g,
      this.buildFilterOptionLabel(iLabel, productNumber, fOData)
    );
    html = html.replace(
      /{{itemLink}}/g,
      this.buildFilterOptionLink(
        fOId,
        iValue,
        fOType,
        fODisplayType,
        fOSelectType,
        keepValuesStatic
      )
    );
    html = html.replace(/{{itemValue}}/g, encodeURIParamValue(iValue));
    html = html.replace(/{{itemTitle}}/g, title);
    html = html.replace(
      /{{itemFunc}}/g,
      "onInteractWithFilterOptionValue(event, this, '" +
        fOType +
        "', '" +
        fODisplayType +
        "', '" +
        fOSelectType +
        "', '" +
        keepValuesStatic +
        "')"
    );
    html = this.checkFilterOptionSelected(fOId, iValue, fOType, fODisplayType)
      ? html.replace(/{{itemSelected}}/g, "selected")
      : html.replace(/{{itemSelected}}/g, "");
    var htmlElement = jQ(html);
    htmlElement.children().attr({
      "data-id": fOId,
      "data-value": encodeURIParamValue(iValue),
      "data-parent-label": fOLabel,
      "data-title": title,
      "data-count": productNumber,
    });
    if (fOType != "collection") {
      htmlElement.children().attr("rel", "nofollow");
    }
    if (fOType == "collection")
      htmlElement.children().attr("data-collection-scope", fOItemValue.key);
    return jQ(htmlElement)[0].outerHTML;
  };
  /* end-boost-2.4.8 */

  /* Begin patch boost-010 run 2 */
  (BCSfFilter.prototype.initFilter = function () {
    return this.isBadUrl()
      ? void (window.location.href = window.location.pathname)
      : (this.updateApiParams(!1), void this.getFilterData("init"));
  }),
    (BCSfFilter.prototype.isBadUrl = function () {
      try {
        var t = decodeURIComponent(window.location.search).split("&"),
          e = !1;
        if (t.length > 0)
          for (var i = 0; i < t.length; i++) {
            var n = t[i],
              a = (n.match(/</g) || []).length,
              r = (n.match(/>/g) || []).length,
              o = (n.match(/alert\(/g) || []).length,
              h = (n.match(/execCommand/g) || []).length;
            if ((a > 0 && r > 0) || a > 1 || r > 1 || o || h) {
              e = !0;
              break;
            }
          }
        return e;
      } catch (l) {
        return !0;
      }
    });
  /* End patch boost-010 run 2 */
