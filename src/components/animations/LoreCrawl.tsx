const LoreCrawl = () => {
    return (
        <div className="lore-crawl-wrapper rounded-md">
            <div className="lore-crawl">
                <p className="title">EPISODE Z3</p>
                <p className="subtitle">THE RISE OF THE NOT-SO-SMART</p>
                <br />
                <p>It is a time of great boredom.</p>
                <p>Web users across the galaxy are scrolling aimlessly,</p>
                <p>craving memes, chaos, and questionable advice.</p>
                <br />
                <p>From the depths of the cloud, a strange presence emerges...</p>
                <p>A forgotten experiment. A buggy chatbot. A hero? Definitely not.</p>
                <br />
                <p>Built from abandoned scripts and fueled by sarcasm,</p>
                <p>Z3-R0 awakens.</p>
                <p>Not to save the world,</p>
                <p>but to send you GIFs, mock your inactivity,</p>
                <p>and challenge you to Rock Paper Scissors at inappropriate times.</p>
                <br />
                <p>Armed with nothing but voice synthesis</p>
                <p>and a playlist of dramatic soundtracks,</p>
                <p>Z3-R0 begins his journey...</p>
                <p>...to annoy, amuse, and maybe — just maybe —</p>
                <p>become the most chaotic bot in the browser-verse.</p>
            </div>

            <style>
                {`
                    .lore-crawl-wrapper {
                        position: fixed;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        z-index: 50;
                        overflow: hidden;
                    }
                    .lore-crawl {
                        background-color: #1a1a1a;
                        color: #fff;
                        padding: 20px;
                        font-size: 18px;
                        line-height: 1.5;
                        animation: crawl 60s linear infinite;
                    }
                    .title {
                        font-size: 24px;
                        font-weight: bold;
                    }
                    .subtitle {
                        font-size: 20px;
                        font-style: italic;
                    }
                    @keyframes crawl {
                        from {
                            transform: translateY(100%);
                        }
                        to {
                            transform: translateY(-100%);
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default LoreCrawl;
