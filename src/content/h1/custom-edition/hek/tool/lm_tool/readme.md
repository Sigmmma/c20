## LM_Tool
{% figure src="lm-time.jpg" %}
LM_Tool outperforms legacy H1CE Tool in lightmapping, but is slower than H1A Tool with `-noassert` enabled.
{% /alert %}
**LM_Tool** by gbMichelle is a community-modified version of [H1CE Tool](~hek/tool) which improves the speed of [lightmaps](~) generation (radiosity). LM_Tool achieves this by disabling some runtime debug checks present in the official Tool release, and can _only_ be used for radiosity; all other functions are disabled. See its [development thread](https://opencarnage.net/index.php?/topic/7751-lm_tool-a-version-of-tool-specifically-for-speeding-up-lightmaps/#comment-98219) for more history.

The updated [H1A Tool](~h1a-tool) supports a `-noassert` flag that, with its other lightmapping optimizations, greatly outperforms LM_Tool and is now the fastest lightmapping solution.


