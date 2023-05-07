checkAdblock()

        async function checkAdblock() {
            this.appendIframeAds();
            let isBlocked = await this.hasAdblockByIframe();
            if (!isBlocked) {
                isBlocked = await this.hasAdblockByScript();
            }

            if (isBlocked) {
                danger() // Halt all site activity if triggered?
                console.log("Ad blocker is used.")
            } else {
                safety() // You can use this to activate the rest of the site or whatever.
                console.log("Ad blocker is not detected.")
            }
        }

        async function hasAdblockByScript() {
            let status = false;
            let url = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
            console.log("Google Syndication Alive.")
            const config = {
                method: 'HEAD',
                mode: 'no-cors',
            }
            let request = new Request(url, config);
            try {
                await fetch(request);
                status = false
            } catch (error) {
                status = true;
            }

            if (status) return status;


            url = '//connect.facebook.net/en_US/fbevents.js'
            console.log("FB Events Alive.")
            request = new Request(url, config);
            try {
                await fetch(request);
                status = false;
            } catch (error) {
                status = true
            }

            if (status) return status;

            url = '//rcm-na.amazon-adsystem.com/e/cm?o=1&p=1'
            console.log("Amazon Adsystem Alive.")
            request = new Request(url, config);
            try {
                await fetch(request);
                status = false;
            } catch (error) {
                status = true
            }

            if (status) return status;

            url = '//adservice.google.com/adsid/integrator.js'
            console.log("Google Adservice Alive.")
            request = new Request(url, config);
            try {
                await fetch(request);
                status = false;
            } catch (error) {
                status = true
            }

            if (status) return status;

            url = '//hb.vntsm.com/v3/live/ad-manager.min.js'
            console.log("Venatus Media Programmatic Ads Alive.")
            request = new Request(url, config);
            try {
                await fetch(request);
                status = false;
            } catch (error) {
                status = true
            }

            if (status) return status;


            url = '//googleads.g.doubleclick.net/pagead/conversion/'
            console.log("Google Ads Doubleclick Alive.")
            request = new Request(url, config);
            try {
                await fetch(request);
                status = false;
            } catch (error) {
                status = true
            }

            return status;
        }

        function hasAdblockByIframe() {
            return new Promise((resolve) => {
                setTimeout(() => {
                    let status = false;
                    const iframe = document.getElementById("banner");
                     iframe.classList.add("adsbygoogle", "adsbygoogle-noablate", "ads-banner", "ad-container", "banner", "ad", "aside-ad", "bannerad", "ad_unit", "img_ad", "ad-slot", "sponsored-post");
                    if (iframe.style.display == "none" ||
                        iframe.style.display == "hidden" ||
                        iframe.style.visibility == "hidden" ||
                        iframe.offsetHeight == 0) {
                        status = true;
                    }
                    resolve(status);
                }, 100)
            })
        }

        function appendIframeAds() {
            const iframe = document.createElement("iframe");
            iframe.height = "1px";
            iframe.width = "1px";
            iframe.id = "banner";
            iframe.src = "https://lunauwu.net/?ads-banner"; // This URL doesn't actually matter, it's just there to not create errors.
            document.body.appendChild(iframe);
        }

        const lu = ({ icon = 'success', toast = false, progressBar = true, text = null, timer = 4000, btnText = 'Okay', direction = 'rtl', position = 'top-right' }) => {
            const modal = document.createElement('section');
            modal.setAttribute('class', 'lu-modal');
            document.body.appendChild(modal);
            const alert = document.createElement('div');
            alert.setAttribute('class', 'lu-alert');
            modal.appendChild(alert);
            var luIcon;
            if (icon == 'danger') {
                luIcon = `
                <div class="lu-alert__icon" style="background: #8C4343;">
                <div class="svg-box">
                    <svg class="circular red-stroke">
                    <circle class="path" cx="75" cy="75" r="50" fill="none" stroke-width="5" stroke-miterlimit="10"/>
                </svg>
                <svg class="cross red-stroke">
                    <g transform="matrix(0.79961,8.65821e-32,8.39584e-32,0.79961,-502.652,-204.518)">
                        <path class="first-line" d="M634.087,300.805L673.361,261.53" fill="none"/>
                    </g>
                    <g transform="matrix(-1.28587e-16,-0.79961,0.79961,-1.28587e-16,-204.752,543.031)">
                        <path class="second-line" d="M634.087,300.805L673.361,261.53"/>
                    </g>
                </svg>
                </div>
            </div>
              `;
            }
            document.querySelector('.lu-alert').innerHTML = `
          ${luIcon}
        <div class='lu-text-con'>
            <p class="lu-alert__text">
            ${text}
            </p>
            <button class="lu-alert__btn">${btnText}</button>
        </div>
            `;
            document.querySelector('.lu-alert__btn').addEventListener('click', function () {
                alert.remove();
                modal.remove();
            })
            window.addEventListener('click', function (e) {
                if (e.target == document.querySelector('.lu-modal')) {
                    modal.remove();
                    alert.remove();
                }
        
            })
        }
        
        
        
        
        
        
        
        
        //  CONFIGURE ALERT HERE
        
        function danger() {
            lu({
                icon: 'danger',
                text: 'Something is blocking the ads. Network based/DNS adblocking is also checked for.',
                btnText: 'Okay'
            });
        };