---
title: CEA compression
thanks:
  zatarita: Documenting CEA compression scheme
redirects:
	- /h1/h1a/compression
---
**CEA compression** is an algorithm used to compress certain files of [Halo: Combat Evolved Aniversary](~h1#anniversary-xbox-360-343-industries-2011) (H1A). It works by breaking a file down into smaller chunks, and compressing each chunk with [zlib][]. The [offsets][offset-wiki] to the beginning of each chunk are then stored in the [header][header-wiki] of the file. Each file is [little endian][little-endian-wiki].

This should not be confused with [H1X map compression](~maps#compressed-maps). Only older versions of H1A compressed map files using this algorithm.

# Header
First `0x40000` (262144) bytes of any CEA-compressed file are the header. It contains a count, as a [32-bit integer][32-bit-wiki] of how many chunks are in the file followed by an [array][array-wiki] of offsets, also as 32-bit integers, to each chunk.

Each chunk is allowed a maximum size of `0x20000` (131072) bytes decompressed, which imposes a file size limit on what can be compressed. We can calculate the theoretical cap with the following equation:

```python
limit = ((header_size - count_size) / offset_size) * chunk_size
#((0x40000 - 4) / 4) * 0x20000
```

This gives us ~8.5 GB of potential space; however, about half of the header is wasted. The offsets are 32-bit values and cannot have a value high enough to reference any offset higher than ~4 GB, leaving about `0x20000` (131072) bytes unusable. The actual data cap varies somewhat due to zlib compression levels and compressed chunk size.

# Chunks
Each chunk contains the decompressed chunk size as a 32-bit integer, and a zlib-compressed [blob][blob-wiki] of data. Due to the nature of zlib compression, the compressed chunk will vary in size. It can be computed using the difference in consecutive offsets from the header (or to the end of the file). For example, to compute the compressed size of chunk `i`:

```python
chunk_offset = offsets[i]
next_chunk_offset = file_length if i + 1 == len(offsets) else offsets[i + 1]
compressed_chunk_size = next_chunk_offset - chunk_offset
```

# Data structure
Here is an example C++ struct representing the above:

```cpp
struct h1a_compressed_file
{
	struct
	{
		uint32_t chunk_count;
		uint32_t offsets[0xffff];
	} header;
	struct
	{
		uint32_t decompressed_chunk_size;
		char* compressed_chunk;
	} chunks[0xffff];
};
```

This example uses the theoretical maximum amount of offsets, and chunks (`0xffff`), however this may not be optimal. In reality H1A compressed files will not contain the theoretical maximum chunks.

[zlib]: https://en.wikipedia.org/wiki/Zlib
[offset-wiki]: https://en.wikipedia.org/wiki/Offset_%28computer_science%29
[little-endian-wiki]: https://en.wikipedia.org/wiki/Endianness
[header-wiki]: https://en.wikipedia.org/wiki/Header_%28computing%29
[32-bit-wiki]: https://en.wikipedia.org/wiki/32-bit_computing
[array-wiki]: https://en.wikipedia.org/wiki/Array_data_structure
[blob-wiki]: https://en.wikipedia.org/wiki/Binary_large_object
